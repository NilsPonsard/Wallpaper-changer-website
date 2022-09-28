FROM node:16-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./ 
RUN npm ci

# Build the application
COPY . .
RUN npm run build

# Test the application
RUN npm run lint

# Run image as non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "start"]
