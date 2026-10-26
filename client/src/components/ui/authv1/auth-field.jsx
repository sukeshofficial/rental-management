import * as React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * AuthField (authv1)
 *
 * Highly configurable, accessible input field with integrated start icon,
 * password visibility toggle, label, and validation error states.
 *
 * Props:
 *  - id                 {string}              Unique input ID
 *  - name               {string}              Input name attribute
 *  - label              {string}              Field label
 *  - type               {string}              Native type ("text"|"email"|"tel"|"password")
 *  - placeholder        {string}              Placeholder text
 *  - value              {string}              Controlled value
 *  - defaultValue       {string}              Uncontrolled initial value
 *  - onChange           {function}            Change handler
 *  - startIcon          {ReactComponent}      Lucide or custom icon component rendered on left
 *  - showPasswordToggle {boolean}             If true and type="password", shows eye toggle
 *  - endAdornment       {ReactNode}           Custom right-side adornment
 *  - layout             {"stacked"|"horizontal"} Default: "stacked"
 *  - required           {boolean}
 *  - disabled           {boolean}
 *  - error              {string}              Validation error message
 *  - autoComplete       {string}
 *  - className          {string}              Outer wrapper class
 *  - inputClassName     {string}              Input element override
 *  - labelClassName     {string}              Label element override
 */
export function AuthField({
    id,
    name,
    label,
    type = "text",
    placeholder,
    value,
    defaultValue,
    onChange,
    startIcon: StartIcon,
    showPasswordToggle = false,
    endAdornment,
    layout = "stacked",
    required = false,
    disabled = false,
    error,
    autoComplete,
    className,
    inputClassName,
    labelClassName,
    ...rest
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const errorId = error ? `${id}-error` : undefined

    const isPasswordType = type === "password"
    const effectiveType = isPasswordType
        ? isPasswordVisible
            ? "text"
            : "password"
        : type

    const valueProps =
        value !== undefined
            ? { value, onChange }
            : defaultValue !== undefined
                ? { defaultValue, onChange }
                : { onChange }

    const isHorizontal = layout === "horizontal"

    return (
        <div
            className={cn(
                "flex w-full",
                isHorizontal
                    ? "flex-col sm:flex-row sm:items-center gap-2"
                    : "flex-col gap-1.5",
                className
            )}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={cn(
                        "text-xs sm:text-sm font-medium tracking-wide text-neutral-800 dark:text-neutral-200 select-none",
                        isHorizontal ? "sm:w-28 sm:text-right shrink-0" : "",
                        disabled && "opacity-50",
                        labelClassName
                    )}
                >
                    {label}
                    {required && <span className="ml-1 text-rose-500">*</span>}
                </label>
            )}

            <div className={cn("relative flex w-full flex-col", isHorizontal && "flex-1")}>
                <div className="relative flex items-center w-full">
                    {/* Leading Start Icon */}
                    {StartIcon && (
                        <div
                            className="pointer-events-none absolute left-3.5 flex items-center justify-center text-neutral-400 dark:text-neutral-500"
                            aria-hidden="true"
                        >
                            <StartIcon className="size-4 shrink-0" />
                        </div>
                    )}

                    {/* Native Input */}
                    <input
                        id={id}
                        name={name}
                        type={effectiveType}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        aria-invalid={error ? "true" : undefined}
                        aria-describedby={errorId}
                        {...valueProps}
                        {...rest}
                        className={cn(
                            "h-11 w-full rounded-xl border border-neutral-300 dark:border-neutral-800",
                            "bg-white dark:bg-[#121620]",
                            "text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
                            "shadow-sm transition-all duration-150 outline-none",
                            "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20",
                            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100 dark:disabled:bg-neutral-900",
                            StartIcon ? "pl-10" : "pl-3.5",
                            (showPasswordToggle || endAdornment) ? "pr-10" : "pr-3.5",
                            error && "border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
                            inputClassName
                        )}
                    />

                    {/* Password Visibility Toggle */}
                    {isPasswordType && showPasswordToggle && (
                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                            className="absolute right-3 flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1 transition-colors"
                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        >
                            {isPasswordVisible ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    )}

                    {/* Custom End Adornment (when not password toggle) */}
                    {!isPasswordType && endAdornment && (
                        <div className="absolute right-3 flex items-center justify-center">
                            {endAdornment}
                        </div>
                    )}
                </div>

                {/* Validation Error */}
                {error && (
                    <p
                        id={errorId}
                        role="alert"
                        className="mt-1 text-xs font-medium text-rose-500 dark:text-rose-400"
                    >
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}

export default AuthField
