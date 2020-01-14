export interface Rect {
    width: number;
    height: number;
    x?: number;
    y?: number;
}
interface ObserverCallback<TEntry> {
    (entries: TEntry[], observer: Observer<TEntry>): void;
}
interface Observer<TEntry = any> {
    new (callback: ObserverCallback<TEntry>): any;
    observe: (target: Element) => void;
    /**
     * Removes target from the list of observed elements.
     */
    unobserve: (target: Element) => void;
    /**
     * Clears both the observationTargets and activeTargets lists.
     */
    disconnect: () => void;
}
export default function useObserver<TEntry, TElement extends Element>(MyObserver: Observer<TEntry>, element: TElement | null | undefined, handler: (entry: TEntry) => void, leadingHandler?: (element: TElement) => void): void;
export {};
