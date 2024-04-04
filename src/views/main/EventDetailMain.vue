<template>
  <!-- Skeleton -->
  <div v-if="$store.getters['eventMain/isLoading']" class="skeleton relative">
    <!-- Skeleton untuk bagian gambar -->
    <div
      class="flex items-center justify-center h-56 mb-4 bg-gray-300 rounded dark:bg-gray-700"
    >
      <svg
        class="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path
          d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
        />
        <path
          d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
        />
      </svg>
    </div>

    <!-- Skeleton untuk bagian konten -->
    <div class="skeleton-content p-4">
      <div class="skeleton-header h-8 mb-4 bg-gray-300 animate-pulse"></div>
      <div class="skeleton-info h-6 mb-4 bg-gray-300 animate-pulse"></div>
      <div
        class="skeleton-description h-12 mb-4 bg-gray-300 animate-pulse"
      ></div>
      <div class="skeleton-tags h-6 mb-4 bg-gray-300 animate-pulse"></div>
      <div class="skeleton-organizer h-12 bg-gray-300 animate-pulse"></div>
    </div>
    <div
      class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
    ></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    <div class="flex items-center mt-4">
      <svg
        class="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        />
      </svg>
      <div>
        <div
          class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"
        ></div>
        <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
  <div v-else>
    <div class="my-16 container mx-auto md:px-6 relative overflow-hidden">
      <!-- Background blur dengan gambar dari event.url -->
      <div class="absolute inset-0 z-0 flex justify-center items-center">
        <div
          class="blur-xl bg-center rounded-xl"
          :style="{
            backgroundImage: `url(${event?.url})`,
            width: '100vw' /* Lebar 100% dari lebar viewport */,
            height: '100vh' /* Tinggi 100% dari tinggi viewport */,
          }"
        ></div>
      </div>

      <!-- Kontainer gambar -->
      <div class="relative z-10 overflow-hidden flex justify-center">
        <!-- Gambar dengan efek cover -->
        <img
          class="w-full sm:h-[500px] sm:w-[600px] md:h-[480px] md:w-[800px] lg:h-[490px] lg:w-[900px] xl:h-[500px] xl:w-[1000px] object-fill mx-auto"
          :src="event?.url"
          alt="image"
        />
      </div>
    </div>

    <!-- Flex cols 2 kolom -->
    <div class="flex flex-col sm:flex-row mt-5 container mx-auto">
      <!-- Kolom 1 -->
      <div class="p-4 basis-4/5">
        <div class="font-bold text-lg mb-2">
          <span class="text-lg text-gray-800">
            {{ formatDate(event?.start_date) }}
          </span>
          <h1 class="text-5xl font-bold text-gray-900">
            {{ event?.title }}
          </h1>
          <!-- Card organizer/profiles -->
          <div
            class="flex items-center mt-4 bg-gray-100 w-[600px] h-20 px-4 rounded-md"
          >
            <!-- Avatar organizer -->
            <img
              class="w-12 h-12 rounded-full mr-4"
              :src="event?.user?.Profiles?.url"
              alt="Organizer Avatar"
            />
            <!-- Nama organizer dan info follower serta jumlah event -->
            <div>
              <h2 class="text-lg font-semibold">
                {{ event?.user?.Profiles?.organize }}
              </h2>
              <div class="text-sm text-gray-600">
                <span>1.2k followers</span>
                <span class="mx-2">•</span>
                <span>45 events hosted</span>
              </div>
            </div>
            <!-- Button follow -->
            <button
              class="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Follow
            </button>
          </div>
          <!-- Info tambahan -->
          <div class="mt-4">
            <span class="text-2xl font-bold flex items-center">
              <!-- Teks "Date and time" -->
              Date and time
            </span>
            <div class="mt-2 flex items-center">
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-calendar-check text-blue-600"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                  />
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                  />
                </svg>
              </span>
              <span class="text-sm text-gray-900">
                {{ formatDate(event?.start_date) }}
                {{
                  " " +
                  (event?.start_time
                    ? new Date("1970-01-01T" + event?.start_time)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })
                        .replace(/^(\d{1}):/, "0$1:") +
                      (parseInt(event?.start_time.split(":")[0]) >= 12
                        ? ""
                        : "")
                    : "Invalid Time")
                }}
                -
                {{
                  " " +
                  (event?.end_time
                    ? new Date("1970-01-01T" + event?.end_time)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })
                        .replace(/^(\d{1}):/, "0$1:") +
                      (parseInt(event?.end_time.split(":")[0]) >= 12 ? "" : "")
                    : "Invalid Time")
                }}
              </span>
            </div>
          </div>
          <div class="mt-16">
            <span class="text-2xl font-bold flex items-center"> Location </span>
            <div
              v-if="
                event?.type_location === 'location' &&
                event?.event_locations.length > 0
              "
              class="mt-2 flex items-center"
            >
              <span class="mr-2">
                <svg
                  v-if="showMap === false"
                  @click="toggleMap"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-caret-up-fill cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                  />
                </svg>
                <svg
                  v-else
                  @click="toggleMap"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-caret-down-fill mb-96 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  />
                </svg>
              </span>
              <div>
                <span class="text-sm text-gray-800">
                  <template v-if="showMap">
                    <iframe
                      class="rounded-xl"
                      width="500"
                      height="300"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      :src="`https://maps.google.com/maps?q=${event?.event_locations[0].lat},${event?.event_locations[0].long}&z=15&output=embed`"
                    ></iframe>
                  </template>
                  <p v-if="showMap === true" class="text-lg">Address :</p>
                  {{ event?.event_locations[0].city }},
                  {{ event?.event_locations[0].state }},
                  {{ event?.event_locations[0].country }}
                  <p v-if="showMap === true">
                    {{ event?.event_locations[0].address }}
                  </p>
                </span>
              </div>
            </div>
            <div
              v-if="event?.type_location === 'online'"
              class="mt-2 flex items-center"
            >
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-collection-play text-blue-600"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"
                  />
                  <path
                    d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              </span>
              <span class="text-sm text-gray-900"> Online </span>
            </div>
            <div
              v-if="event?.type_location === 'tba'"
              class="mt-2 flex items-center"
            >
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-collection-play text-blue-600"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"
                  />
                  <path
                    d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              </span>
              <span class="text-sm text-gray-900"> To be announced </span>
            </div>
          </div>
          <div class="mt-8">
            <span class="text-2xl font-bold flex items-center">
              About this event
            </span>
            <div class="mt-2 flex flex-col items-start">
              <div class="flex items-center mb-2">
                <span
                  class="mr-2 bg-gray-100 flex items-center justify-center w-9 h-9 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-clock-history text-blue-600"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"
                    />
                    <path
                      d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"
                    />
                    <path
                      d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"
                    />
                  </svg>
                </span>
                <span class="text-sm text-gray-800">
                  {{
                    event && event.start_time && event.end_time
                      ? getTimeDifference(event.start_time, event.end_time)
                      : event && event.technical === "choose"
                      ? "Recurring Event"
                      : event && event.technical === "choose schedule"
                      ? "One-time Event"
                      : "Invalid Time"
                  }}
                </span>
              </div>
              <span class="text-sm text-gray-700">
                <div v-html="event?.description"></div>
              </span>
            </div>
            <div
              v-if="event?.description.length === 0"
              class="text-center mb-20"
            >
              <el-empty
                description="There is no description"
                class="text-center"
              />
            </div>
          </div>

          <div class="mt-4">
            <span class="text-2xl font-bold flex items-center"> Tags </span>
            <div class="mt-2 flex items-center">
              <span
                v-for="(tag, index) in eventTags"
                :key="index"
                class="text-sm font-normal text-gray-900 bg-gray-200 px-3 py-2 mr-2 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="mt-8">
            <span class="text-2xl font-bold flex items-center">
              Organized by
            </span>
            <div class="mt-2 flex items-center">
              <!-- Card organizer/profiles -->
              <div
                class="flex items-center mt-4 bg-gray-100 w-[600px] h-20 px-4 rounded-xl"
              >
                <!-- Avatar organizer -->
                <img
                  class="w-12 h-12 rounded-full mr-4"
                  :src="event?.user?.Profiles?.url"
                  alt="Organizer Avatar"
                />

                <!-- Nama organizer dan info follower serta jumlah event -->
                <div>
                  <h2 class="text-xl font-bold">
                    {{ event?.user?.Profiles?.organize }}
                  </h2>
                  <div class="text-sm text-gray-600">
                    <span>1.2k followers</span>
                    <span class="mx-2">•</span>
                    <span>45 events hosted</span>
                  </div>
                </div>
                <div>
                  <!-- Contact button -->
                  <span
                    class="ml-16 text-sm text-blue-500 rounded hover:text-blue-600 cursor-pointer"
                  >
                    Contact
                  </span>
                  <!-- Button follow -->
                  <button
                    class="ml-8 px-6 py-3 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Follow
                  </button>
                </div>
                <!-- ini konten about -->
              </div>
            </div>
          </div>
          <!-- Card event yang baru ditambahkan -->
          <div class="mt-8">
            <span class="text-2xl font-bold flex items-center"
              >Related Events</span
            >
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
            >
              <!-- Iterasi untuk setiap event -->
              <div
                v-for="(relatedEvent, index) in relatedEvents"
                :key="index"
                class="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <!-- Gambar event -->
                <img
                  :src="relatedEvent.imageUrl"
                  alt="Event Image"
                  class="w-full h-48 object-cover object-center"
                />
                <!-- Detail event -->
                <div class="p-4">
                  <h2 class="text-xl font-semibold text-gray-800">
                    {{ relatedEvent.title }}
                  </h2>
                  <p class="text-sm text-gray-600 mt-2">
                    {{ relatedEvent.description }}
                  </p>
                  <div class="mt-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-calendar-event text-gray-600 mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.5 1.5a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5v-2zM1 5.5A1.5 1.5 0 0 1 2.5 4h11A1.5 1.5 0 0 1 15 5.5v2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 7.5v-2zm0 5A1.5 1.5 0 0 1 2.5 9h11a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5v-2z"
                      />
                      <path d="M6 1h1v4H6V1zm3 0h1v4H9V1zM3 1h1v4H3V1z" />
                    </svg>
                    <span class="text-sm text-gray-600">{{
                      formatDate(relatedEvent.date)
                    }}</span>
                  </div>
                  <div class="mt-4 flex justify-between">
                    <span class="text-sm text-gray-600"
                      >Location: {{ relatedEvent.location }}</span
                    >
                    <button
                      class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kolom 2 -->
      <div class="p-4 basis-1/3">
        <div class="mt-4">
          <span
            class="cursor-pointer flex absolute z-20 hover:bg-gray-100 hover:border hover:transition-all hover:scale-125 hover:border-gray-100 bottom-0 right-28 mb-2 mr-2 rounded-full w-10 h-10 font-semibold text-gray-700 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-share"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
              />
            </svg>
          </span>
          <span
            class="cursor-pointer flex absolute z-20 hover:bg-gray-100 hover:border hover:transition-all hover:scale-125 hover:border-gray-100 bottom-0 right-12 mb-2 mr-2 rounded-full w-10 h-10 font-semibold text-gray-700 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart text-gray-800 font-bold"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
              />
            </svg>
          </span>
        </div>
        <div
          class="bg-white p-4 shadow rounded sticky border border-collapse border-gray-400 top-20 z-0"
          style="z-index: 999"
        >
          <h2 class="text-xl font-bold mb-4">HTM</h2>
          <!-- Konten harga -->
          <div>
            <p class="text-lg">
              {{ event?.price ? formatCurrency(event?.price) : "Free" }}
            </p>
            <p v-if="event?.price > 0" class="text-sm text-gray-500">
              On the spot
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      event: null,
      showMap: false,
      eventTags: [],
    };
  },
  computed: {},
  methods: {
    async fetchEventDetails() {
      try {
        const uuid = this.$route.params.uuid;
        const response = await this.$store.dispatch(
          "eventMain/fetchEventMainByUuid",
          uuid
        );
        this.event = response;
        this.eventTags = JSON.parse(response.tags);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    },
    formatCurrency(price) {
      // Konversi ke IDR dan tambahkan pemisah ribuan jika diperlukan
      return price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
    formatDate(date) {
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      const formattedDate = new Date(date).toLocaleDateString("en-US", options);
      return formattedDate;
    },
    getTimeDifference(startTime, endTime) {
      const start = new Date("1970-01-01T" + startTime);
      const end = new Date("1970-01-01T" + endTime);

      // Handle jika jam ngaco atau tidak sesuai
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Invalid Time";
      }

      // Menghitung selisih waktu dalam milidetik
      const difference = end.getTime() - start.getTime();

      // Mengubah selisih waktu menjadi jam dan menit
      const hours = Math.floor(difference / 3600000);
      const minutes = Math.floor((difference % 3600000) / 60000);

      // Mengembalikan total waktu dalam format jam:menit
      return `${hours} hours ${minutes} minutes`;
    },
    toggleMap() {
      this.showMap = !this.showMap;
    },
  },
  created() {
    this.fetchEventDetails();
  },
  beforeRouteEnter(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Teks Default");
    next();
  },

  beforeRouteUpdate(to, from, next) {
    document.title = "Eventplan - " + (to.meta.title || "Teks Default");
    next();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
