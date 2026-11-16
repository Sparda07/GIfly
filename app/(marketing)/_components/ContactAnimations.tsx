"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

const paths = [
  "M720 450C720 450 742 440 770 410C810 365 860 360 900 315C970 240 1040 230 1110 170C1190 100 1280 80 1430 -15",
  "M720 450C720 450 700 390 650 320C600 250 570 190 500 120C430 50 390 -20 260 -260",
  "M720 450C720 450 800 440 900 435C1030 425 1180 410 1410 385",
  "M720 450C720 450 650 500 570 540C470 590 390 640 280 705C190 760 100 800 -20 875",
  "M720 450C720 450 680 520 640 610C590 730 540 850 510 1040C490 1140 450 1240 420 1300",
  "M720 450C720 450 780 500 840 640C910 800 1010 980 1130 1200",
  "M720 450C720 450 700 410 660 300C620 190 590 40 520 -380",
  "M720 450C720 450 760 430 850 380C980 300 1100 180 1370 -100",
];

const colors = [
  "#46A5CA",
  "#8C2F2F",
  "#4FAE4D",
  "#D6590C",
  "#247AFB",
  "#A534A0",
  "#D7C200",
  "#46A29C",
];

const pathVariants = {
  initial: { strokeDashoffset: 800, strokeDasharray: "50 800" },
  animate: {
    strokeDashoffset: 0,
    strokeDasharray: "20 800",
    opacity: [0, 1, 1, 0],
  },
};

export function BackgroundLines({
  children,
  className,
  svgOptions,
}: {
  children?: ReactNode;
  className?: string;
  svgOptions?: { duration?: number };
}) {
  return (
    <div className={cn("h-[20rem] w-full bg-white dark:bg-black", className)}>
      <motion.svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {paths.concat(paths).map((path, index) => (
          <motion.path
            d={path}
            stroke={colors[index % colors.length]}
            strokeWidth="2.3"
            strokeLinecap="round"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: svgOptions?.duration || 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: (index % 8) * 0.6,
              repeatDelay: 2 + (index % 5),
            }}
            key={`${path}-${index}`}
          />
        ))}
      </motion.svg>
      {children}
    </div>
  );
}

export function ThreeDMarquee({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, columnIndex) =>
    images.slice(columnIndex * chunkSize, (columnIndex + 1) * chunkSize),
  );

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-[400px]",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative right-[50%] top-96 grid size-full origin-top-left grid-cols-4 gap-8"
          >
            {chunks.map((chunk, columnIndex) => (
              <motion.div
                animate={{ y: columnIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: columnIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={columnIndex}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {chunk.map((image, imageIndex) => (
                  <div className="relative" key={`${image}-${imageIndex}`}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Image
                        src={image}
                        alt={`GIFLY downloader preview ${imageIndex + 1}`}
                        className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                        width={970}
                        height={700}
                        sizes="(max-width: 640px) 485px, 970px"
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridLineHorizontal({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  );
}

function GridLineVertical({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  );
}

