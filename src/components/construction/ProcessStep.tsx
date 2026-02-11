interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep = ({ step, title, description, isLast = false }: ProcessStepProps) => {
  return (
    <div className="group flex flex-col items-center text-center relative">
      {/* Connecting line (Desktop) */}
      {!isLast && (
        <div className="hidden md:block absolute top-10 left-1/2 w-[calc(100%+1rem)] h-[2px] bg-gradient-to-r from-accent/50 to-accent/10 z-0 pointer-events-none" />
      )}

      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-accent to-accent/60 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

        {/* Step number */}
        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-white font-black text-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl z-10">
          {step}
        </div>
      </div>

      <h4 className="font-bold text-white mt-5 mb-2 text-lg">{title}</h4>
      <p className="text-sm text-gray-300 max-w-[180px] leading-relaxed">{description}</p>
    </div>
  );
};

export default ProcessStep;






