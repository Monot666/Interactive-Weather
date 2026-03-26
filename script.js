const apiKey = "33db5029232b50d9799b6235c731a83b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q="; // Tambah lang=id biar deskripsi bahasa indonesia

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const mainIcon = document.querySelector("#main-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("Kota tidak ditemukan!");
            return;
        }

        console.log(data); // Untuk debug di console

        // 1. Update Teks UI Dasar
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#description").innerHTML = data.weather[0].description;
        
        // 2. Update Detail Tambahan
        document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

        // 3. Logika Ikon dan Background Dinamis
        const kondisi = data.weather[0].main;
        
        // Map kondisi cuaca ke Ikon FontAwesome dan Gambar Background
        // Catatan: Saya pakai URL gambar resolusi tinggi dari Unsplash yang gratis
        let iconClass = "";
        let bgImage = "";

        if (kondisi === "Clouds") {
            iconClass = "fas fa-cloud";
            bgImage = "https://images.unsplash.com/photo-1594492683428-21316d0d2109?q=80&w=1920";
        } else if (kondisi === "Clear") {
            iconClass = "fas fa-sun";
            bgImage = "https://images.unsplash.com/photo-1521404092-d6105822ff9a?q=80&w=1920";
        } else if (kondisi === "Rain" || kondisi === "Drizzle") {
            iconClass = "fas fa-cloud-showers-heavy";
            bgImage = "https://images.unsplash.com/photo-1534274988757-a28bf1a51c17?q=80&w=1920";
        } else if (kondisi === "Thunderstorm") {
            iconClass = "fas fa-cloud-bolt";
            bgImage = "https://images.unsplash.com/photo-1605723511133-c4e975ac7b4f?q=80&w=1920";
        } else if (kondisi === "Snow") {
            iconClass = "fas fa-snowflake";
            bgImage = "https://images.unsplash.com/photo-1547842777-2e11a3b3ac4a?q=80&w=1920";
        } else if (kondisi === "Mist" || kondisi === "Haze" || kondisi === "Fog") {
            iconClass = "fas fa-smog";
            bgImage = "https://images.unsplash.com/photo-1510137600163-2729bc6959a6?q=80&w=1920";
        } else {
            iconClass = "fas fa-cloud-sun"; // Default
            bgImage = "https://images.unsplash.com/photo-1496180727794-817822f65950?q=80&w=1920";
        }

        // Terapkan Perubahan
        mainIcon.className = iconClass; // Ganti class ikon
        document.body.style.backgroundImage = `url('${bgImage}')`; // Ganti background

    } catch (error) {
        console.error("Terjadi masalah koneksi:", error);
    }
}

// Jalankan fungsi saat tombol diklik
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Jalankan fungsi saat tekan 'Enter' di input
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Opsional: Jalankan default kota saat pertama buka
checkWeather("Jakarta");