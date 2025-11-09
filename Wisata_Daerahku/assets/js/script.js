const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const kulinerData = {
    title: "Pizza Margherita",
    tagline: "Klasik Italia dengan cita rasa otentik dari Napoli 🍕",
    image: "https://images.unsplash.com/photo-1601924582971-d4df6b3f6ab2?auto=format&fit=crop&w=800&q=80",
    longDescription: `
        Pizza Margherita adalah salah satu hidangan paling ikonik dari Italia. 
        Diciptakan untuk menghormati Ratu Margherita dari Savoy, pizza ini terkenal karena kombinasi sederhana namun sempurna: 
        saus tomat segar, keju mozzarella, dan daun basil yang melambangkan warna bendera Italia.`,
    originHistory: `
        Pizza Margherita berasal dari kota Napoli pada akhir abad ke-19. 
        Chef Raffaele Esposito menciptakannya sebagai bentuk penghormatan untuk Ratu Margherita, 
        menggunakan bahan-bahan sederhana namun penuh makna.`,
    keyIngredients: `
        Tepung terigu, saus tomat segar, mozzarella, basil, minyak zaitun extra virgin, dan sedikit garam laut.`,
    bestPlace: {
        name: "L'Antica Pizzeria da Michele",
        location: "Napoli, Italia",
        description: "Restoran legendaris yang telah menyajikan pizza Margherita autentik sejak tahun 1870. Tempat ini dikenal di seluruh dunia karena resep tradisionalnya yang tak berubah.",
        mapLink: "https://goo.gl/maps/YbJYB1mJYbK2"
    }
};
document.getElementById('kulinerDetailTitle').textContent = kulinerData.title;
document.getElementById('kulinerDetailTagline').textContent = kulinerData.tagline;
document.getElementById('kulinerDetailImage').src = kulinerData.image;
document.getElementById('kulinerDetailLongDescription').textContent = kulinerData.longDescription;
document.getElementById('kulinerDetailOriginHistory').textContent = kulinerData.originHistory;
document.getElementById('kulinerDetailKeyIngredients').textContent = kulinerData.keyIngredients;

document.getElementById('kulinerDetailBestPlaceName').textContent = kulinerData.bestPlace.name;
document.getElementById('kulinerDetailBestPlaceLocation').textContent = kulinerData.bestPlace.location;
document.getElementById('kulinerDetailBestPlaceDescription').textContent = kulinerData.bestPlace.description;
document.getElementById('kulinerDetailBestPlaceLink').href = kulinerData.bestPlace.mapLink;

const weatherButton = document.getElementById('weatherInfoButton');
const weatherResult = document.getElementById('weatherResult');
const weatherIcon = document.getElementById('weatherIcon');
const weatherText = document.getElementById('weatherText');

const weathers = [
    { icon: "fa-sun", text: "Cerah dan hangat 🌞" },
    { icon: "fa-cloud", text: "Berawan lembut ☁️" },
    { icon: "fa-cloud-rain", text: "Hujan ringan 🌧️" },
    { icon: "fa-snowflake", text: "Dingin dan bersalju ❄️" },
    { icon: "fa-wind", text: "Bersepoi-sepoi angin 🌬️" },
];

weatherButton.addEventListener('click', () => {
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    weatherIcon.className = `fas ${randomWeather.icon} text-xl mr-2`;
    weatherText.textContent = randomWeather.text;
    weatherResult.classList.remove('hidden');
    weatherResult.classList.add('animate-pulse');
    setTimeout(() => weatherResult.classList.remove('animate-pulse'), 1000);
});

const travelForm = document.getElementById('travelCostForm');
const travelResult = document.getElementById('travelCostResult');
const estimatedCostElement = document.getElementById('estimatedCost');

travelForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const distance = parseFloat(document.getElementById('distance').value);
    const transport = document.getElementById('transportation').value;
    let cost = 0;

    if (transport === 'plane') {
        cost = (distance / 1000) * 1500000;
    } else if (transport === 'train') {
        cost = (distance / 1000) * 500000;
    } else if (transport === 'car') {
        cost = (distance / 100) * 100000;
    }

    const formattedCost = `Rp ${cost.toLocaleString('id-ID')}`;
    estimatedCostElement.textContent = formattedCost;
    travelResult.classList.remove('hidden');
    travelResult.classList.add('animate-bounce');
    setTimeout(() => travelResult.classList.remove('animate-bounce'), 1000);
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script rating dimuat...");

  const stars = document.querySelectorAll(".rating-star");
  const ratingInput = document.getElementById("ratingValue");

  if (!stars.length) {
    console.error("❌ Tidak menemukan elemen .rating-star di halaman. Cek class di HTML kamu!");
    return;
  }
  if (!ratingInput) {
    console.error("❌ Tidak menemukan elemen #ratingValue (input hidden). Tambahkan di HTML.");
    return;
  }

  console.log(`🎯 Ditemukan ${stars.length} bintang.`);

  stars.forEach(star => {
   
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      ratingInput.value = value;
      console.log(`⭐ Rating dipilih: ${value}`);

      stars.forEach(s => {
        const starValue = parseInt(s.getAttribute("data-value"));
        if (starValue <= value) {
          s.classList.add("text-yellow-400");
          s.classList.remove("text-gray-400");
          s.style.textShadow = "0 0 10px #facc15, 0 0 25px #fde047";
        } else {
          s.classList.add("text-gray-400");
          s.classList.remove("text-yellow-400");
          s.style.textShadow = "none";
        }
      });
    });

    star.addEventListener("mouseenter", () => {
      const hoverValue = parseInt(star.getAttribute("data-value"));
      stars.forEach(s => {
        const starValue = parseInt(s.getAttribute("data-value"));
        if (starValue <= hoverValue) {
          s.style.textShadow = "0 0 20px #fde68a";
        }
      });
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach(s => {
        const starValue = parseInt(s.getAttribute("data-value"));
        const currentValue = parseInt(ratingInput.value);
        if (starValue > currentValue) {
          s.style.textShadow = "none";
        }
      });
    });
  });
});
const reviewForm = document.getElementById("reviewForm");
const reviewMessageDiv = document.getElementById("reviewMessageDiv");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const reviewerName = document.getElementById("reviewerName").value.trim();
    const reviewEmail = document.getElementById("reviewEmail").value.trim();
    const itemReviewed = document.getElementById("itemReviewed").value.trim();
    const rating = parseInt(document.getElementById("ratingValue").value);
    const reviewMessage = document.getElementById("reviewMessage").value.trim();

    if (isNaN(rating) || rating < 1 || rating > 5) {
        reviewMessageDiv.textContent = "Silakan masukkan rating yang valid (1–5)!";
        reviewMessageDiv.classList.remove("hidden");
        return;
    }

    const newReview = {
        reviewerName,
        reviewEmail,
        itemReviewed,
        rating,
        reviewMessage,
        date: new Date().toLocaleString()
    };
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    reviewMessageDiv.textContent = "Terima kasih! Ulasan Anda sudah tersimpan.";
    reviewMessageDiv.classList.remove("hidden");

    reviewForm.reset();
    let popupText = "Ulasan Saat Ini:\n\n";
    reviews.forEach((rev, index) => {
        popupText += `${index + 1}. ${rev.reviewerName} (${rev.rating}/5)\n   ${rev.itemReviewed}\n   "${rev.reviewMessage}"\n   [${rev.date}]\n\n`;
    });

    alert(popupText);
});





document.getElementById('current-year').textContent = new Date().getFullYear();
