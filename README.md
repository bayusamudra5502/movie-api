<img src="public/movie.png" alt="Movie DB API" width="120">

# Movie DB API

Repo ini merupakan API Movie menggunakan Typescript, Node.JS, Express, Postgresql, dan Docker. API ini memiliki fitur sebagai berikut:

- Kategori Film
- Daftar Film
- Autentikasi
- Menambahkan vote (rating) dan favorit

## Dokumentasi Endpoint

Untuk dokumentasi endpoint, anda dapat lihat pada https://documenter.getpostman.com/view/9498435/UVeDsmpt

## API

Aplikasi ini telah dideploy di Heroku. Anda dapat melihatnya pada https://gdsc-movie-api.herokuapp.com/.

## System Requirement

Untuk menjalankan aplikasi ini, anda perlu menginstall environtment berikut:

- NodeJs v16
- Postgresql
- npm
- Docker (opsional)
- Docker Compose (opsional)

## Cara Menggunakan

Untuk menjalankan aplikasi ini, terdapat tiga cara cara yaitu sebagai berikut:

### Menggunakan Docker

Untuk menggunakan doker, pastikan anda telah menginstall `docker` dan `docker-compose` pada aplikasi anda. Setelah menginstall kebutuhan, anda hanya perlu menjalankan perintah berikut:

```shell
docker-compose up
```

### Tanpa Docker

Jika anda ingin menjalankan tanpa docker, pastikan anda membuat variabel global terlebih dahulu.

Anda juga bisa membuat file `.env` seperti pada contoh `.env.example`

Jika setup sudah berhasil, anda perlu melakukan langkah berikut:

1. Jalankan perintah `npm install`
2. Jalankan perintah `npm run build`
3. Jalankan perintah `npm start`

### Mode Development

Untuk menjalankan mode development, anda perlu membuat file `.env` yang berisi variabel global yang dibutuhkan. Anda dapat lihat lebih detail mengenai environtment variabel pada bagian variabel global.

Jika sudah selesai, lakukan langkah berikut:

1. Jalankan perintah `npm install`
2. Jalankan perintah `npm run dev`

## Variabel global

Untuk menjalankan program ini, dubutuhkan variabel global sebagai berikut:

- `DATABASE_URL` : String yang menunjukan letak database. Format dari url ini adalah sebagai berikut

```shell
postgresql://username:password@server:port/db_name
```

- `PORT`: Port tempat server akan bekerja

Anda juga dapat membuat file `.env` dengan contoh pada `.env.example`
