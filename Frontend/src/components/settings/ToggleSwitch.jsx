import React from "react";

const ToggleSwitch = ({
    checked,
    onChange,
}) => {

    return (

        <button
            onClick={onChange}
            className={`
            w-14
            h-8
            rounded-full
            transition
            ${
                checked
                    ? "bg-green-500"
                    : "bg-gray-300"
            }
            `}
        >

            <div
                className={`
                bg-white
                w-6
                h-6
                rounded-full
                mt-1
                transition
                ${
                    checked
                        ? "translate-x-7"
                        : "translate-x-1"
                }
                `}
            />

        </button>

    );

};

export default ToggleSwitch;