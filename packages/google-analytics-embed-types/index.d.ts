declare namespace gapi.analytics {
  export interface Response {}

  export interface AuthOptions {
    clientid?: string;
    container?: string | HTMLElement;
    userInfoLabel?: string;
    scopes?: string[];
    overwriteDefaultScopes?: boolean;
    serverAuth?: { access_token: string };
  }

  export class auth {
    isAuthorized(): boolean;
    signOut(): auth;
    getAuthResponse(): Response;
    getUserProfile(): Response;
    authorize(options: AuthOptions): auth;

    static authorize(options: AuthOptions): auth;
    static isAuthorized(): boolean;
    static signOut(): auth;
    static getAuthResponse(): Response;
    static getUserProfile(): Response;

    static on(
      event: "signIn" | "signOut" | "needsAuthorization",
      callback: () => void
    ): void;
    static on(event: "error", callback: (response: Response) => void): void;
    static once(
      event: "signIn" | "signOut" | "needsAuthorization",
      callback: () => void
    ): void;
    static once(event: "error", callback: (response: Response) => void): void;
    static off(
      event: "signIn" | "signOut" | "needsAuthorization" | "error",
      handler: Function
    ): void;

    on(
      event: "signIn" | "signOut" | "needsAuthorization",
      callback: () => void
    ): void;
    on(event: "error", callback: (response: Response) => void): void;
    once(
      event: "signIn" | "signOut" | "needsAuthorization",
      callback: () => void
    ): void;
    once(event: "error", callback: (response: Response) => void): void;
    off(
      event: "signIn" | "signOut" | "needsAuthorization" | "error",
      handler: Function
    ): void;
  }

  export function ready(callback: () => void): void;

  class Component<T> {
    constructor(opt: T);
    get(): T;
    set(opt: T): void;
    execute(): void;
  }

  type Query = Record<string, string>;

  export namespace report {
    export interface DataOptions {
      query: Query;
    }

    export class Data extends Component<DataOptions> {
      on(event: "success" | "error", cb: (res: Response) => void): void;
      once(event: "success" | "error", cb: (res: Response) => void): void;
      off(event: "success" | "error", handler: Function): void;
      emit(event: "success" | "error", res: Response): void;
    }
  }

  export namespace googleCharts {
    export interface ChartOptions<T, O> {
      type: T;
      container: string | HTMLElement;
      options: O;
    }
    export interface DataChartOptions {
      query: Query;
      chart:
        | ChartOptions<"LINE", google.visualization.LineChartOptions>
        | ChartOptions<"COLUMN", google.visualization.ColumnChartOptions>
        | ChartOptions<"BAR", google.visualization.BarChartOptions>
        | ChartOptions<"TABLE", google.visualization.TableOptions>
        | ChartOptions<"GEO", google.visualization.GeoChartOptions>;
    }

    export interface DataChartSuccessResult {
      chart: unknown;
      data: google.visualization.DataObject;
      dataTable: google.visualization.DataTable;
      response: Response;
    }

    export class DataChart extends Component<DataChartOptions> {
      on(event: "success", cb: (res: DataChartSuccessResult) => void): void;
      on(event: "error", cb: (res: Response) => void): void;
      once(event: "success", cb: (res: DataChartSuccessResult) => void): void;
      once(event: "error", cb: (res: Response) => void): void;
      off(event: "success" | "error", handler: Function): void;
      emit(event: "success", res: DataChartSuccessResult): void;
      emit(event: "error", res: Response): void;
    }
  }

  export interface ViewSelectorOptions {
    container: string | HTMLElement;
  }

  export class ViewSelector extends Component<ViewSelectorOptions> {
    ids: string;
    on(event: "change", cb: (ids: string) => void): void;
    once(event: "change", cb: (ids: string) => void): void;
    off(event: "change", handler: Function): void;
    emit(event: "change", ids: string): void;
  }
}
