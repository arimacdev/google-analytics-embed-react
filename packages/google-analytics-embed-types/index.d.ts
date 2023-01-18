// https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference
declare namespace gapi.analytics {
  export type Response = Record<string, any>;

  // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#q_details
  export interface Query {
    ids: string;
    'start-date': string;
    'end-date': string;
    metrics: string;
    dimensions?: string;
    sort?: string;
    filters?: string;
    segment?: string;
    samplingLevel?: 'DEFAULT' | 'FASTER' | 'HIGHER_PRECISION';
    'include-empty-rows'?: boolean;
    'start-index'?: number;
    'max-results'?: number;
    output?: string;
    fields?: string;
    prettyPrint?: string;
    userIp?: string;
    quotaUser?: string;
    access_token?: string;
    callback?: string;
    key?: string;
  }

  // https://developers.google.com/analytics/devguides/reporting/core/v3/errors
  export interface ErrorResponse {
    error: {
      message: string;
      code: number;
      errors: [
        {
          domain: string;
          message: string;
          reason: string;
          locationType?: string;
          location?: string;
        }
      ];
    };
  }

  // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#data_response
  export interface SuccessResponse {
    kind: 'analytics#gaData';
    id: string;
    query: {
      'start-date': string;
      'end-date': string;
      ids: string;
      dimensions: string[];
      metrics: string[];
      samplingLevel?: 'DEFAULT' | 'FASTER' | 'HIGHER_PRECISION';
      'include-empty-rows'?: boolean;
      sort?: string[];
      filters?: string;
      segment?: string;
      'start-index': number;
      'max-results': number;
    };
    startIndex?: number;
    itemsPerPage: number;
    totalResults: number;
    startDate?: string;
    endDate?: string;
    selfLink: string;
    previousLink?: string;
    nextLink?: string;
    profileInfo: {
      profileId: string;
      accountId: string;
      webPropertyId: string;
      internalWebPropertyId: string;
      profileName: string;
      tableId: string;
    };
    containsSampledData: boolean;
    sampleSize?: string;
    sampleSpace?: string;
    columnHeaders: Array<{
      name: string;
      columnType: 'DIMENSION' | 'METRIC';
      dataType: 'STRING' | 'INTEGER' | 'PERCENT' | 'TIME' | 'CURRENCY' | 'FLOAT';
    }>;
    totalsForAllResults: Record<string, string>;
    rows: string[][];
    dataTable?: google.visualization.DataObject;
  }

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

    static on(event: 'signIn' | 'signOut' | 'needsAuthorization', callback: () => void): void;
    static on(event: 'error', callback: (response: Response) => void): void;
    static once(event: 'signIn' | 'signOut' | 'needsAuthorization', callback: () => void): void;
    static once(event: 'error', callback: (response: Response) => void): void;
    static off(
      event: 'signIn' | 'signOut' | 'needsAuthorization' | 'error',
      handler: Function
    ): void;
    static off(event: 'signIn' | 'signOut' | 'needsAuthorization' | 'error'): void;
    static off(): void;

    on(event: 'signIn' | 'signOut' | 'needsAuthorization', callback: () => void): void;
    on(event: 'error', callback: (response: Response) => void): void;
    once(event: 'signIn' | 'signOut' | 'needsAuthorization', callback: () => void): void;
    once(event: 'error', callback: (response: Response) => void): void;
    off(event: 'signIn' | 'signOut' | 'needsAuthorization' | 'error', handler: Function): void;
    off(event: 'signIn' | 'signOut' | 'needsAuthorization' | 'error'): void;
    off(): void;
  }

  export function ready(callback: () => void): void;

  class Component<T> {
    constructor(opt: T);
    get(): T;
    set(opt: T): void;
    execute(): void;
  }

  export namespace report {
    export interface DataOptions {
      query: Query;
    }

    export class Data extends Component<DataOptions> {
      on(event: 'success', cb: (res: SuccessResponse) => void): void;
      on(event: 'error', cb: (res: ErrorResponse) => void): void;
      once(event: 'success', cb: (res: SuccessResponse) => void): void;
      once(event: 'error', cb: (res: ErrorResponse) => void): void;
      off(event: 'success' | 'error', handler: Function): void;
      off(event: 'success' | 'error'): void;
      off(): void;
      emit(event: 'success', res: SuccessResponse): void;
      emit(event: 'error', res: ErrorResponse): void;
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
        | ChartOptions<'LINE', google.visualization.LineChartOptions>
        | ChartOptions<'COLUMN', google.visualization.ColumnChartOptions>
        | ChartOptions<'BAR', google.visualization.BarChartOptions>
        | ChartOptions<'TABLE', google.visualization.TableOptions>
        | ChartOptions<'PIE', google.visualization.PieChartOptions>
        | ChartOptions<'GEO', google.visualization.GeoChartOptions>;
    }

    export interface DataChartSuccessResult {
      chart: unknown;
      data: google.visualization.DataObject;
      dataTable: google.visualization.DataTable;
      response: SuccessResponse;
    }

    export class DataChart extends Component<DataChartOptions> {
      on(event: 'success', cb: (res: DataChartSuccessResult) => void): void;
      on(event: 'error', cb: (res: ErrorResponse) => void): void;
      once(event: 'success', cb: (res: DataChartSuccessResult) => void): void;
      once(event: 'error', cb: (res: ErrorResponse) => void): void;
      off(event: 'success' | 'error', handler: Function): void;
      off(event: 'success' | 'error'): void;
      off(): void;
      emit(event: 'success', res: DataChartSuccessResult): void;
      emit(event: 'error', res: ErrorResponse): void;
    }
  }

  export interface ViewSelectorOptions {
    container: string | HTMLElement;
  }

  export class ViewSelector extends Component<ViewSelectorOptions> {
    ids: string;
    on(event: 'change', cb: (ids: string) => void): void;
    once(event: 'change', cb: (ids: string) => void): void;
    off(event: 'change', handler: Function): void;
    off(event: 'change'): void;
    off(): void;
    emit(event: 'change', ids: string): void;
  }
}
