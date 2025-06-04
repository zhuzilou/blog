# 适配m1系统，指定镜像架构
FROM --platform=amd64 node:18-alpine AS base

# 可选，自定义参数变量，在docker build时通过--build-arg ENV=参数
# ARG ENV

# Install dependencies only when needed
FROM base AS deps
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# install pnpm
RUN npm install -g pnpm

COPY package.json  ./
COPY pnpm-lock.yaml ./
RUN npm config set registry https://registry.npmmirror.com \
  && npm_config_platform=linux npm_config_arch=x64 npm_config_libc=glibc pnpm i

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# install pnpm
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# 可使用自定义参数变量来打包
# RUN npm run ${ENV}

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN apk add tzdata
# 添加时区环境变量，亚洲，上海
ENV TimeZone=Asia/Shanghai
# 使用软连接，并且将时区配置覆盖/etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone


ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder  /app/.next/standalone ./
COPY --from=builder  /app/.env /app
COPY --from=builder  /app/public /app/public
COPY --from=builder  /app/.next/static /app/.next/static

EXPOSE 3002
ENV PORT 3002

ENV HOSTNAME="0.0.0.0"

CMD node server.js