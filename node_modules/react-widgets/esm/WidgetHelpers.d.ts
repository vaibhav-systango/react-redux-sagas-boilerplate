export declare function notify<T extends (...args: any) => any>(handler: T | undefined, args: Parameters<T>): void;
export declare const useInstanceId: (otherId?: string | undefined, suffix?: string) => string;
/**
 * Allows for defering popup rendering untill the widget is focused,
 * or has been opened (in order to not remove it suddenly on close)
 */
export declare function useFirstFocusedRender(focused: boolean, open: boolean): boolean;
//# sourceMappingURL=WidgetHelpers.d.ts.map