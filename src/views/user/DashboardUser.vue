  <template>
    <div class="mt-12">
      <!-- Statistik Event -->
      <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <!-- Statistik 2: Jumlah Views -->
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
  </svg>
          </div>
          <div class="p-4 text-right">
            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ totalViews }} views</h4>
          </div>
          <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong :class="{'text-green-500': viewsChange >= 0, 'text-red-500': viewsChange < 0}">
                    {{ viewsChange >= 0 ? '+' : '' }}{{ viewsChange }}%
                  </strong>&nbsp;than last month
                </p>
              </div>
        </div>
        <!-- Statistik 3: Jumlah Event -->
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
  </svg>
          </div>
          <div class="p-4 text-right">
            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ totalEvents }} event</h4>
          </div>
          <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong :class="{'text-green-500': eventsChange >= 0, 'text-red-500': eventsChange < 0}">
                    {{ eventsChange >= 0 ? '+' : '' }}{{ eventsChange }}%
                  </strong>&nbsp;than yesterday
                </p>
              </div>
        </div>
        <!-- Statistik 4: Durasi Event Rata-rata -->
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch-fill" viewBox="0 0 16 16">
    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0"/>
  </svg>
          </div>
          <div class="p-4 text-right">
            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{{ averageDuration }}</h4>
          </div>
          <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong :class="{'text-green-500': durationChange >= 0, 'text-red-500': durationChange < 0}">
                    {{ durationChange >= 0 ? '+' : '' }}{{ durationChange }}%
                  </strong>&nbsp;than yesterday
                </p>
              </div>
        </div>
      </div>

      <!-- Komponen Daftar Event -->
      <div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          <!-- Judul dan Tombol -->
          <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
            <div>
              <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">Events</h6>
              <p class="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-4 w-4 text-blue-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>
                <strong>{{ upcomingEvents.length }} upcoming events</strong>
              </p>
            </div>
            <button aria-expanded="false" aria-haspopup="menu" id=":r5:" class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
              <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                </svg>
              </span>
            </button>
          </div>
          <!-- Isi Daftar Event -->
          <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table class="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Event Name</p>
                  </th>
                  <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Date</p>
                  </th>
                  <th class="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Location</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Loop untuk Setiap Event -->
                <tr v-for="(event, index) in upcomingEvents" :key="index">
                  <td class="py-3 px-5 border-b border-blue-gray-50">
                    <div class="flex items-center gap-4">
                      <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{{ event.name }}</p>
                    </div>
                  </td>
                  <td class="py-3 px-5 border-b border-blue-gray-50">
                  <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">{{ parseDate(event.date) }}</p>
                  </td>
                  <td class="py-3 px-5 border-b border-blue-gray-50">
                  <!-- Menampilkan lokasi event berdasarkan kondisi -->
                  <p class="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                  <template v-if="event.type_location === 'location' && event.event_locations && event.event_locations.length > 0">
                    {{ event.event_locations[0].address }}, {{ event.event_locations[0].city }}, {{ event.event_locations[0].state }}, {{ event.event_locations[0].country }}
                  </template>
                  <template v-else-if="event.type_location === 'online'">
                    Online
                  </template>
                  <template v-else>
                    TBA (To Be Announced)
                  </template>
                </p>
                </td>
                </tr>
                <!-- Akhir Loop -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapGetters("eventMain", ["getMyEvent"]),
      // Mendapatkan daftar event milik pengguna
    upcomingEvents() {
    return this.getMyEvent.map(event => {
      console.log("Type Location:", event?.type_location); // Tambahkan ini
      return {
        type_location: event?.type_location,
        name: event?.title,
        date: `${event?.start_date} - ${event?.end_date}`,
        location: event?.event_locations.length > 0 ? `${event.event_locations[0].address}, ${event.event_locations[0].city}, ${event.event_locations[0].state}, ${event.event_locations[0].country}` : "Location not specified"
      };
    });
  },
      // Statistik Jumlah Views
  totalViews() {
    // Mendapatkan semua event dari Vuex store
    const events = this.getMyEvent;
    
    // Menghitung total views dari semua event
    const totalViews = events.reduce((acc, event) => {
      // Menambahkan jumlah views dari setiap event
      return acc + event.views;
    }, 0);
    
    // Konversi jumlah views ke format yang sesuai
    if (totalViews >= 1000000) {
      return (totalViews / 1000000).toFixed(1) + "M";
    } else if (totalViews >= 1000) {
      return (totalViews / 1000).toFixed(1) + "K";
    } else {
      return totalViews.toLocaleString();
    }
  },
      // Statistik Jumlah Event
      totalEvents() {
        // Implementasi logika untuk menghitung total event yang dimiliki pengguna
        return this.getMyEvent.length; // Menggunakan panjang array event dari Vuex store
      },
      // Statistik Durasi Event Rata-rata
  averageDuration() {
    // Mendapatkan semua event dari Vuex store
    const events = this.getMyEvent;
    
    // Menghitung total durasi semua event
    const totalDuration = events.reduce((acc, event) => {
      // Mengonversi waktu mulai dan waktu selesai ke objek Date yang valid
      const startTime = new Date(`1970-01-01T${event.start_time}`);
      const endTime = new Date(`1970-01-01T${event.end_time}`);
      
      // Menghitung durasi event dengan mengambil selisih antara startTime dan endTime
      const durationInMilliseconds = endTime - startTime;
      // Mengonversi durasi ke jam
      const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
      
      return acc + durationInHours;
    }, 0);
    
    // Menghitung durasi rata-rata
    const averageDuration = totalDuration / events.length;
    
    // Periksa apakah averageDuration adalah NaN (Not a Number)
    if (isNaN(averageDuration)) {
      return "No events or invalid time data";
    }

    return `${averageDuration.toFixed(2)} hours`;
  },
      // Perubahan Presentase Jumlah Views
    viewsChange() {
    // Misalkan Anda memiliki data views dari periode sebelumnya
    const previousViews = 2000;
    // Misalkan Anda memiliki data views saat ini
    const currentViews = 2300;
    
    // Menghitung perubahan presentase
    const percentageChange = ((currentViews - previousViews) / previousViews) * 100;
    
    return percentageChange.toFixed(2);
  },

  eventsChange() {
    // Misalkan Anda memiliki data jumlah event dari periode sebelumnya
    const previousEventsCount = 100;
    // Misalkan Anda memiliki data jumlah event saat ini
    const currentEventsCount = this.getMyEvent.length;
    
    // Menghitung perubahan presentase
    const percentageChange = ((currentEventsCount - previousEventsCount) / previousEventsCount) * 100;
    
    return percentageChange.toFixed(2);
  },

  durationChange() {
    // Misalkan Anda memiliki data durasi rata-rata event dari periode sebelumnya
    const previousAverageDuration = 2.5; // dalam jam
    // Misalkan Anda memiliki data durasi rata-rata event saat ini
    const currentAverageDuration = 3.0; // dalam jam
    
    // Menghitung perubahan presentase
    const percentageChange = ((currentAverageDuration - previousAverageDuration) / previousAverageDuration) * 100;
    
    return percentageChange.toFixed(2);
  }

    },
    methods: {
      ...mapActions("eventMain", ["fetchMyEvents"]),   // Function to parse date range format
      parseDate(dateRangeString) {
        // Check if the date range string is empty or undefined
        if (!dateRangeString) return "Invalid Date";

        // Split the date range string into start and end dates
        const [startDate, endDate] = dateRangeString.split(" - ");

        // Format the start and end dates
        const formattedStartDate = this.formatDate(startDate);
        const formattedEndDate = this.formatDate(endDate);

        // Return the formatted date range
        return `${formattedStartDate} - ${formattedEndDate}`;
      },

      // Function to format individual date
      formatDate(dateString) {
        // Attempt to parse the date string
        const parsedDate = new Date(dateString);

        // Check if the parsed date is valid
        if (!isNaN(parsedDate.getTime())) {
          // Format the date as "NamaHari, DD NamaBulan YYYY"
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          return parsedDate.toLocaleDateString('id-ID', options);
        } else {
          // If parsing fails, return "Invalid Date"
          return "Invalid Date";
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      document.title = "EventPlan - " + (to.meta.title || "Teks Default");
      next();
    },
    beforeRouteUpdate(to, from, next) {
      document.title = "EventPlan - " + (to.meta.title || "Teks Default");
      next();
    },
    mounted() {
      // Panggil aksi fetchMyEvents untuk mengambil data event pengguna saat komponen dimuat
      this.fetchMyEvents();
    },
  };
  </script>
