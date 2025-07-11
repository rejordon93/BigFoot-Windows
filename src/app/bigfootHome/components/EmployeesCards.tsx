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
                Chris is the visionary behind BigFoot Cleaning Co.—the one who
                first saw the potential to turn a simple idea into a thriving
                business. With a strong military background in logistics and an
                exceptional eye for detail, he ensures every project runs
                seamlessly from start to finish.
              </p>
              <p>
                When he's not expertly scaling buildings to clean hard-to-reach
                windows, Chris is fine-tuning our equipment and refining
                training protocols to keep the team at peak performance. His
                motto: "Leave no streak behind."
              </p>
              <p>
                Drawing on the discipline and precision he gained in the
                service, Chris approaches every gutter cleaning and window
                washing job with unmatched care. He’s the calm force that keeps
                BigFoot Cleaning Co. on track and always aiming higher.
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
                Ethan is the heart of BigFoot Cleaning Co.’s customer
                experience. With a passion for connecting with people and a
                mission to build lasting client relationships, he ensures every
                customer feels valued and heard. His background in military
                communications and natural leadership make him the ideal
                representative of our brand.
              </p>
              <p>
                From providing detailed quotes and coordinating schedules to
                following up on every job, Ethan treats each interaction like a
                top-priority mission. His dedication to service and
                professionalism shines through in every conversation.
              </p>
              <p>
                Ethan’s commitment to excellence and deep care for the Seattle
                community have played a vital role in building BigFoot Cleaning
                Co.’s trusted reputation—one satisfied customer at a time.
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
