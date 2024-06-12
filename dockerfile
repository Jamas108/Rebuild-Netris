# Gunakan image node sebagai dasar
FROM node:18

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode aplikasi ke dalam direktori kerja
COPY . .

# Jalankan Metro Bundler
CMD ["npx", "react-native", "start"]
