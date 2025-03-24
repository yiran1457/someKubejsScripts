
class MyConfig {
    BrokenClassFilter$Server: boolean
    BrokenClassFilter$Client: boolean
    BrokenClassFilter$Startup: boolean

    ExtraPlayerRender: boolean
    ModifyMainMenu: boolean
    ItemQuestLink: boolean

    MaxHoldTime: number
    ToolTipLength: number
    DisplayQuest: boolean
}


//修复 eventjs 的 NativeEvents 的 onEvent 方法的 event 的补全问题
class MyNativeEvents {
    onEvent: <T extends typeof $Event<(any) >>(eventClass: T, consumer: (event: InstanceType<(T)>) => void) => void;


    onGenericEvent(genericClassFilter: Internal.ClassConvertible_, priority: Internal.EventPriority_, receiveCancelled: boolean, type: Internal.ClassConvertible_, handler: Internal.WrappedGenericEventHandler_): void;
    onGenericEvent(genericClassFilter: Internal.ClassConvertible_, type: Internal.ClassConvertible_, handler: Internal.WrappedGenericEventHandler_): void;
    onGenericEventTyped<T extends Internal.GenericEvent<any>, F>(genericClassFilter: F, priority: Internal.EventPriority_, receiveCancelled: boolean, eventType: T, handler: Internal.Consumer_<T>): void;
    onEventTyped<T extends Internal.Event>(priority: Internal.EventPriority_, receiveCancelled: boolean, eventType: T, handler: Internal.Consumer_<T>): void;
    onEvent(priority: Internal.EventPriority_, receiveCancelled: boolean, type: Internal.ClassConvertible_, handler: Internal.WrappedEventHandler_): void;
}


export declare global {
    const config: MyConfig;
    const NativeEvents: MyNativeEvents;
    const global = new MyGlobal;
}

import { $IJeiRuntime as My$IJeiRuntime } from "packages/mezz/jei/api/runtime/$IJeiRuntime"

class MyGlobal {
    public jeiRuntime: My$IJeiRuntime
}