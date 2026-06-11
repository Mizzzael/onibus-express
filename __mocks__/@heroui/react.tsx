import React from 'react'
const createMockComponent = (name: string) => {
    const Component = ({
                           children,
                           onPress,
                           onClick,
                           ...props
                       }: any) => {
        const handleClick = (e: React.MouseEvent) => {
            // Chama tanto onPress quanto onClick para manter compatibilidade
            if (onPress) {
                onPress(e);
            }
            if (onClick) {
                onClick(e);
            }
        };

        switch (name) {
            case 'Button':
                const customProps = {...props};
                delete customProps.isDisabled;
                return (
                    <button
                        data-testid={`heroui-${name}`}
                        {...customProps}
                        disabled={props.isDisabled}
                        onClick={handleClick}
                    >
                        {children}
                    </button>
                );
            default:
                return (
                    <div
                        data-testid={`heroui-${name}`}
                        {...props}
                        role={name}
                        onClick={handleClick}
                    >
                        {children}
                    </div>
                );
        }
    };

    Component.displayName = name;
    return Component;
};
// Componentes principais do Heroui
export const Button = createMockComponent('Button');
export const Card = createMockComponent('Card');
export const CardBody = createMockComponent('CardBody');
export const CardHeader = createMockComponent('CardHeader');
export const CardFooter = createMockComponent('CardFooter');
export const Chip = createMockComponent('Chip');
export const Input = createMockComponent('Input');
export const Modal = createMockComponent('Modal');
export const ModalBody = createMockComponent('ModalBody');
export const ModalContent = createMockComponent('ModalContent');
export const ModalFooter = createMockComponent('ModalFooter');
export const ModalHeader = createMockComponent('ModalHeader');
export const Spinner = createMockComponent('Spinner');