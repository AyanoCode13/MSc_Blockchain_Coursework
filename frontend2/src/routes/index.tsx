import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";


export default component$(() => {
  const nav = useNavigate();
  const zipcode = useSignal("");
  return (
    <main>
      <section
        class="hero min-h-screen"
        style={{ backgroundImage: "url(/house2.jpg)" }}
        id="home"
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-lg">
            <h1 class="mb-5 flex text-6xl font-bold">Real Estate DApp</h1>
            <h3 class="mb-5 text-3xl">The real estate NFT marketplace</h3>
            <div class="join">
              <div>
                <div>
                  <input
                    class="input join-item input-bordered text-black"
                    placeholder="Enter Zipcode"
                    required
                    onChange$={(e) => zipcode.value += (e.target as HTMLInputElement).value + "&page=1&take=5"}
                    onKeyDown$={async (e) => {
                      console.log(e.key)
                      if (e.key === "Enter") {
                        // SPA navigate to /dashboard
                        await nav("/properties?zipcode=" + zipcode.value + "&page=1&take=5");
                      }
                    }}
                  />
                </div>
              </div>

              <div class="indicator">
                <button class="btn join-item"
                  onClick$={async () => {
                    // SPA navigate to /dashboard
                    await nav("/properties?zipcode=" + zipcode.value + "&page=1&take=5");
                  }}
                >
                  Go to dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" class="h-screen w-screen">
        about
      </section>
      <section id="contact" class="h-screen w-screen">
        contact
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
