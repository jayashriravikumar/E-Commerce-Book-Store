import { ChevronRight } from "lucide-react";

const SettingCard = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        bg-white
        dark:bg-gray-800
        border
        border-gray-200
        dark:border-gray-700
        rounded-xl
        p-4
        flex
        items-center
        justify-between
        hover:shadow-md
        transition
      "
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">

        <div className="text-blue-600 shrink-0">
          {icon}
        </div>

        <div className="text-left min-w-0">

          <h2 className="font-semibold text-sm md:text-base truncate">
            {title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm break-words">
            {subtitle}
          </p>

        </div>

      </div>

      <ChevronRight className="shrink-0 ml-2" />
    </button>
  );
};

export default SettingCard;