export interface AppSettings {
    test: string;
    dateFormat: string;
    currentsprint?: {
        number?: number,
        startDate?: Date,
        endDate?: Date
    }
    reportedLists?: Array<ReportedList>;
}

/** Trello lists to be shown in reporting*/
export interface ReportedList {
    order: number;
    /** Id of the Trello List*/
    listId: string;
    /** Name of the Trello List*/
    listName: string;
    /** Title to display for list on reports.  Shows trello list name if blank*/
    displayName?: string;
    GroupByLabels?: boolean;
    showCheckLists?: boolean;
    showDescription?: boolean;
    showComments?: boolean;
}