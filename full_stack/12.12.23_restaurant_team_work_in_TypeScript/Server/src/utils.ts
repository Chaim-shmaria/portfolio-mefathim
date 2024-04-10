import { selectAll } from "./baseServer";

export type Table = Record<string, any>[];

/**
 * Add to `tableA` a new column `newColumn` , with values of `tableB.columnB`.
 * 
 * using id of `tableB` reference by `tableA.columnA`
 * @returns `tableA` with the `newColumn`
 */
export const injectNames = async (
    tableA: Table,
    tableB: string,
    columnA: string,
    columnB: string,
    newColumn: string,
    defaultValue: any = 'not found'
): Promise<Table> => {
    try {
        const rowsB = await selectAll(tableB) as Table;

        const updatedTableA = tableA.map(rowA => {
            const rowB = rowsB.find(rowB => rowB['id'] === rowA[columnA]);
            if (rowB) {
                return { ...rowA, [newColumn]: rowB[columnB] };
            } else {
                return { ...rowA, [newColumn]: defaultValue };
            }
        });
        return updatedTableA;
    } catch (error) {
        console.error("Error in injectNames:", error);
        return [];
    } 
};

