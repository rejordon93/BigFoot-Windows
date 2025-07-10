import React from "react";
import Image from "next/image";
import img from "../../../../public/window.png";

export default function BigFootStory() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Story */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 mb-6">
              Bigfoot Window & Gutter Cleaning
            </h1>
            <p className="text-2xl text-slate-300 font-semibold">
              Veteran-Owned • Seattle Area • Professional Service
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-600 p-8">
              <h2 className="text-3xl font-bold text-amber-400 mb-6">
                Our Story
              </h2>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Chris and I started BigFoot Cleaning Co. after our military
                  service, inspired by the legendary creature that gets things
                  done without being seen. We tackle tough jobs in hard-to-reach
                  places, just like BigFoot himself.
                </p>

                <p>
                  What started with a squeegee and bucket has grown into
                  Seattle&aposs most reliable cleaning service. Our military
                  precision and BigFoot-level determination make every job
                  legendary.
                </p>
              </div>

              <div className="mt-8 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <p className="text-amber-300 font-semibold text-center">
                  &aposFrom service members to service providers – because
                  excellence never goes out of style.&apos
                </p>
                <p className="text-slate-400 text-center mt-2">
                  - Ethan & Chris, Founders
                </p>
              </div>
            </div>

            {/* Visual Element */}

            <div className="text-center">
              <div className="relative w-full h-[500px] mb-6">
                <Image
                  src={img}
                  alt="Window cleaning service"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
