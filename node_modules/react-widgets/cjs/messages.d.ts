import { ReactNode } from 'react';
declare type LabelMessage = string | ((ctx: any) => string);
declare type RenderableMessage = ReactNode | (() => ReactNode);
export interface Messages {
    moveToday: LabelMessage;
    moveBack: LabelMessage;
    moveForward: LabelMessage;
    dateButton: LabelMessage;
    openCombobox: LabelMessage;
    emptyList: RenderableMessage;
    emptyFilter: RenderableMessage;
    createOption: (_value: any, searchTerm: string) => ReactNode | ReactNode;
    tagsLabel: LabelMessage;
    removeLabel: LabelMessage;
    noneSelected: LabelMessage;
    selectedItems: (labels: string[]) => string;
    increment: LabelMessage;
    decrement: LabelMessage;
}
export declare type UserProvidedMessages = Partial<Messages>;
export declare type ProcessedMessages = {
    [P in keyof Messages]: Messages[P] extends Function ? Messages[P] : () => string;
};
export declare function getMessages(defaults?: UserProvidedMessages): ProcessedMessages;
export declare const useMessagesWithDefaults: (defaults?: Partial<Messages> | undefined) => ProcessedMessages;
export {};
//# sourceMappingURL=messages.d.ts.map