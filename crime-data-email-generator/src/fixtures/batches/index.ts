import File from "../../types/file";
import createBatchWith10ValidCrimes from "./batch-with-10-valid-crimes";
import createBatchWith100ValidCrimes from "./batch-with-100-valid-crimes";
import createBatchWith1000ValidCrimes from "./batch-with-1000-valid-crimes";
import createBatchWithAllColumnValidations from "./batch-with-all-column-validation-errors";
import createBatchWithUtcAndBstDates from "./batch-with-utc-and-bst-dates";

const batches: Array<File> = [
    createBatchWith10ValidCrimes(),
    createBatchWith100ValidCrimes(),
    createBatchWith1000ValidCrimes(),
    createBatchWithAllColumnValidations(),
    createBatchWithUtcAndBstDates()
]

export default batches
