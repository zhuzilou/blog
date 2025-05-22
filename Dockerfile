# ----------------------
# 基础镜像（所有阶段共享）
# ----------------------
FROM node:18-alpine AS base

# 全局安装 pnpm（所有阶段共用，固定版本避免版本漂移）
RUN npm install -g pnpm@10.6.2

# 可选，自定义参数变量，在docker build时通过--build-arg ENV=参数
# ARG ENV

# ----------------------
# 第一阶段：依赖安装
# ----------------------
# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
  && apk update \
  && apk add --no-cache libc6-compat

# 仅复制依赖清单文件，利用 Docker 层缓存
COPY package.json pnpm-lock.yaml* ./

RUN npm config set registry https://registry.npmmirror.com \
  && npm_config_platform=linux npm_config_arch=x64 npm_config_libc=glibc pnpm i

# 安装生产依赖（--prod 可减少非必要依赖）
RUN pnpm install --frozen-lockfile

# ----------------------
# 第二阶段：构建应用
# ----------------------
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# 复用依赖阶段的 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制源代码（排除非必要文件）
COPY . .

# 清理旧构建缓存（可选）
RUN rm -rf .next

# 执行构建命令，构建完成后删除 node_modules
RUN pnpm run build 

# ----------------------
# 第三阶段：生产镜像
# ----------------------
FROM base AS runner
WORKDIR /app

RUN apk add tzdata
# 添加时区环境变量，亚洲，上海
ENV TimeZone=Asia/Shanghai
# 使用软连接，并且将时区配置覆盖/etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

# 安全相关配置
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/. ./
COPY --from=builder --chown=nextjs:nodejs /app/public /app/public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static /app/.next/static
# 此行似乎无用，未验证
COPY --from=builder  /app/.env /app

# 设置非 root 用户运行（增强安全性）
USER nextjs

# 配置端口
EXPOSE 3002
ENV PORT 3002
ENV HOSTNAME 0.0.0.0

# 启动命令
CMD ["node", "server.js"]
