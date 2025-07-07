import React from "react";
import Image from "next/image";
import img from "../../../../public/IMG_5515.jpg";

export default function EmployeesCards() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 mb-4">
            Meet the Team
          </h2>
          <p className="text-slate-300 text-lg">
            The veterans behind BigFoot Cleaning Co.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chris Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-600 p-8 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-500">
                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                  <span className="text-6xl text-amber-400">
                    {" "}
                    <Image
                      src={img}
                      alt="Sign Up"
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">Chris</h3>
              <p className="text-slate-300 font-semibold">
                Co-Founder & Operations
              </p>
              <div className="flex justify-center mt-2">
                <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">
                  U.S. Veteran
                </span>
              </div>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                Chris is the mastermind behind our operations and the guy who
                first had the BigFoot vision. With his military background in
                logistics and keen eye for detail, he ensures every job runs
                like a well-oiled machine.
              </p>
              <p>
                When he&apos;s not scaling buildings to clean hard-to-reach
                windows, Chris can be found perfecting our equipment setup and
                training protocols. His motto: &quot;Leave no streak
                behind.&quot;
              </p>
              <p>
                Chris brings the same precision he learned in the service to
                every gutter cleaning and window washing job. He&apos;s the
                steady hand that keeps BigFoot Cleaning Co. moving forward.
              </p>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-amber-400 font-bold text-xl">5+</div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-amber-400 font-bold text-xl">500+</div>
                <div className="text-slate-400 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-amber-400 font-bold text-xl">100%</div>
                <div className="text-slate-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Ethan Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-600 p-8 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-500">
                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <span className="text-6xl text-slate-900">👨‍💼</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">Ethan</h3>
              <p className="text-slate-300 font-semibold">
                Co-Founder & Customer Relations
              </p>
              <div className="flex justify-center mt-2">
                <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">
                  U.S. Veteran
                </span>
              </div>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                Ethan handles the customer-facing side of BigFoot Cleaning Co.
                and is passionate about building lasting relationships with
                every client. His military communication skills and natural
                leadership make him the perfect face for our growing business.
              </p>
              <p>
                Whether he&apos;s providing quotes, coordinating schedules, or
                personally ensuring customer satisfaction, Ethan treats every
                interaction like it&apos;s the most important mission of the
                day.
              </p>
              <p>
                His commitment to excellence and genuine care for the Seattle
                community has helped BigFoot Cleaning Co. build its legendary
                reputation one satisfied customer at a time.
              </p>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-amber-400 font-bold text-xl">5+</div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-amber-400 font-bold text-xl">500+</div>
                <div className="text-slate-400 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-amber-400 font-bold text-xl">100%</div>
                <div className="text-slate-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
