import {InputGroup} from "@heroui/react";
import {IMaskMixin} from "react-imask";
import type {Ref} from "react";
import {Input} from "@heroui/react";

export const MaskInputGroup = IMaskMixin(({ inputRef, ...props }) => (
    <InputGroup.Input
        ref={inputRef as unknown as Ref<HTMLInputElement> }
        {...(() => {
            const p = {...props};
            delete p.defaultValue;
            return p
        })()}
    />
))

export const MaskInput = IMaskMixin(({ inputRef, ...props }) => (
    <Input
        ref={inputRef as unknown as Ref<HTMLInputElement> }
        {...(() => {
            const p = {...props};
            delete p.defaultValue;
            return p
        })()}
    />
))