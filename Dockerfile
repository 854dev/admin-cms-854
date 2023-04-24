FROM node:18-alpine AS builder

WORKDIR /home/ubuntu/app/admin-cms-854

# Install dependencies based on the preferred package manager
COPY . ./
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

RUN yarn run build

COPY --from=builder /home/ubuntu/app/admin-cms-854/dist /etc/nginx/html/admin-cms-854