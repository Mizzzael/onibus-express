import {Label} from "@heroui/react";
import {DateField} from "@heroui/react";
import {DatePicker} from "@heroui/react";
import {Calendar} from "@heroui/react";
import {TimeField} from "@heroui/react";
import type {TimeValue} from "@heroui/react";
import type {DateValue} from "@heroui/react";
import type {ValidationError} from "next/dist/compiled/amphtml-validator";
import {FieldError} from "@heroui/react";

type Granularity = "day" | "hour" | "minute" | "second";

export type TDatePickerInputProps = {
    label?: string;
    name?: string;
    classDateFieldGroup?: string;
    granularity?: Granularity;
    classDatePicker?: string;
    onChange?: (value: DateValue | null) => void;
    value?: DateValue;
    minDate?: DateValue;
    placeholder?: DateValue;
    validate?: (value: DateValue | null) => boolean|null|ValidationError|undefined;
    isRequired?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
}

export default function DatePickerInput({
    label,
    name,
    classDateFieldGroup,
    granularity,
    classDatePicker,
    onChange,
    value,
    validate,
    isRequired,
    isDisabled,
    minDate,
    isInvalid,
    placeholder,
}: TDatePickerInputProps) {
    return (
        <DatePicker
            isRequired={isRequired}
            value={value}
            onChange={(value) => {
                onChange?.(value);
            }}
            minValue={minDate}
            aria-label={label}
            granularity={granularity || "minute"}
            className={classDatePicker || "w-full"} name={ name }
            validate={validate}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            placeholderValue={placeholder}
        >
            {({ state }) => (
                <>
                    {label && (
                        <Label>
                            { label }
                        </Label>
                    ) || null}
                    <DateField.Group className={classDateFieldGroup || "rounded-xl ring-foreground ring-1"} fullWidth>
                        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                        <DateField.Suffix>
                            <DatePicker.Trigger>
                                <DatePicker.TriggerIndicator />
                            </DatePicker.Trigger>
                        </DateField.Suffix>
                    </DateField.Group>
                    <FieldError>
                        O passageiro precisa ter no minímo 16 anos de idade!
                    </FieldError>
                    <DatePicker.Popover>
                        <Calendar aria-label={label || "date"}>
                            <Calendar.Header>
                                <Calendar.YearPickerTrigger>
                                    <Calendar.YearPickerTriggerHeading />
                                    <Calendar.YearPickerTriggerIndicator />
                                </Calendar.YearPickerTrigger>
                                <Calendar.NavButton slot="previous" />
                                <Calendar.NavButton slot="next" />
                            </Calendar.Header>
                            <Calendar.Grid>
                                <Calendar.GridHeader>
                                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                </Calendar.GridHeader>
                                <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                            </Calendar.Grid>
                            <Calendar.YearPickerGrid>
                                <Calendar.YearPickerGridBody>
                                    {({year}) => <Calendar.YearPickerCell year={year} />}
                                </Calendar.YearPickerGridBody>
                            </Calendar.YearPickerGrid>
                        </Calendar>
                        { granularity !== "day" && (
                            <div className="flex items-center justify-between">
                                <Label>Time</Label>
                                <TimeField
                                    aria-label="Time"
                                    granularity={granularity || "minute"}
                                    hideTimeZone={true}
                                    name="time"
                                    onChange={(v) => state.setTimeValue(v as TimeValue)}
                                    value={state.timeValue}
                                >
                                    <TimeField.Group variant="secondary">
                                        <TimeField.Input>
                                            {(segment) => <TimeField.Segment segment={segment} />}
                                        </TimeField.Input>
                                    </TimeField.Group>
                                </TimeField>
                            </div>
                        )}
                    </DatePicker.Popover>
                </>
            )}
        </DatePicker>
    )
}