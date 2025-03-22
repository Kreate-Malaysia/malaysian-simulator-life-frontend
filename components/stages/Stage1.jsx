import Image from "next/image";
import FeedbackButton from "../FeedbackButton";

export default function Stage1({ username, setUsername, gender, race }) {
  return (
    <div className="flex justify-center items-center gap-y-6 text-center w-full">
      <div className="flex flex-col justify-center items-center gap-y-6 text-center w-full">
        <div className="flex flex-col items-center gap-y-6">
          {gender === "male" && race === "malay" ? (
            <Image
              src="/malay-male.png"
              alt="Malay Male"
              width={500}
              height={354}
              className="md:w-[500px] md:h-[319px]"
            />
          ) : (
            <>
              <Image
                src="/chinese-male.png"
                alt="Chinese Male"
                width={150}
                height={164}
                className="md:w-[200px] md:h-[219px]"
              />
              <p className="text-[28px] md:text-[40px] font-bold">
                YOU BORN AS A
              </p>
              <FeedbackButton />
            </>
          )}
        </div>
        {gender === "male" && race === "malay" ? (
          <>
            <p className="text-[20px] md:text-[40px] mt-4 w-4/5 lg:w-[918px] px-4 md:px-0">
              As a young Malay boy, you happily count down to the holidays—until
              you realize the only “hadiah” waiting for you isn’t under the
              tree, but between your legs. Adoi, SUNAT Time! 😭✂
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl md:text-5xl font-bold">Chinese Male</p>
            <p className="text-[20px] md:text-[40px] mt-4 w-4/5 lg:w-[918px] px-4 md:px-0">
              WA~ WA~ WA~. ON A FINE DAY IN MALAYSIA. A BABY WAS BORN. THE WIND
              SHOOK THE KELAPA TREES. TRAFFIC IN PUCHONG AS USUAL. HEAVY. AND
              THE BABY NAME IS...
            </p>
          </>
        )}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-[36px] md:text-[84px]">
          <span className="text-black font-normal">NAME:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent outline-none text-black w-full md:w-1/2 text-center"
            style={{
              background:
                "repeating-linear-gradient(to right, black 0px, black 10px, transparent 10px, transparent 20px)",
              backgroundSize: "100% 2px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          />
        </div>
      </div>
    </div>
  );
}
