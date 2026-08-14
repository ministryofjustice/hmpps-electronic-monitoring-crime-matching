# Crime data email generator

The `crime-data-email-generator` creates test data for the police data ingestion and crime matching flows.

It supports two types of test data:

1. **Fake crime data** for testing ingestion of crime CSV attachments and email messages.
2. **Synthetic crime matching data** containing related crime and electronic monitoring records that can be loaded into a test Datastore.

## Structure

### Entry points

`createFakeCrimeData.ts` generates standalone crime batches and email fixtures for testing the police crime data ingestion flow.

`createSyntheticData.ts` generates related crime and electronic monitoring datasets for testing the crime matching flow.

### Fixtures

`fixtures/batches/` defines reusable crime batches. A batch contains a name and an array of crime records; conversion to CSV is handled separately when the fixture is written to disk or included in an email.

`fixtures/crimes/` contains individual crime fixture definitions for testing specific properties of a crime (e.g. date handling).

`fixtures/emails/` defines email scenarios used by crime email ingestion tests, including valid messages and error scenarios.

`fixtures/electronic-monitoring/` generates device wearers, activations and position trails used by the synthetic data generator.

`fixtures/helpers/` contains lower-level random-data functions used to construct fixtures, such as crimes, device activations and landmarks.

### Helpers

The top-level `helpers/` directory contains functions that turn fixture data into external file formats.

`createEmailFileContent.ts` serialises an email fixture into an email file.

`createCaseloadCsvFromElectronicMonitoringData.ts` produces Datastore-compatible caseload data.

`createDeviceActivationsCsvFromElectronicMonitoringData.ts` produces Datastore-compatible device activation data.

`createDevicePositionsCsvFromElectronicMonitoringData.ts` produces Datastore-compatible device position data.

`formatters.ts` contains date and timestamp formatting used by the generated Datastore data.

`fs.ts` contains the functions used to write generated data into the `output/` directory.

## Setup

Install dependencies:

```bash
npm run setup
```

Compile the TypeScript:

```bash
npm run build
```

The generation commands execute the compiled files under `dist`, so the project must be built before running them.

## Generate fake crime data

Run:

```bash
npm run create-fake-crime-data
```

This generates the predefined crime batch CSVs and email fixtures under `output/`.

The crime CSVs can be sent to the dev mailbox to validate the police data ingestion flow.

The generated email files can be used locally to simulate ingestion without requiring a real email client (by "uploading" them to Localstack S3 and sending notifications to Localstack SNS).

## Generate synthetic crime matching data

Run:

```bash
npm run create-synthetic-data
```

This generates a crime batch together with related electronic monitoring data.

The output includes:

```text
batch-with-100-valid-crimes-at-landmarks.csv
positions.csv
device_activations.csv
caseload.csv
```

The crime batch contains 100 crimes placed at a small set of known landmarks.

The generator also creates 100 device wearers. Each wearer has between one and three device activations. Some activations are generated with position trails passing through the location of one of the generated crimes.

When an activation is selected to match a crime, its activation and deactivation dates are generated so that the activation covers the crime period.

Because crimes are generated from a relatively small collection of landmark locations, multiple device wearers may match the same crime. The generated dataset is intended for functional and end-to-end testing rather than production-like statistical distribution.

## Using the synthetic data

The generated electronic monitoring CSVs can be uploaded to either:

* the Datastore test environment; or
* the mock Datastore deployed to Cloud Platform for end-to-end testing.

Load the generated `caseload.csv`, `device_activations.csv`, and `positions.csv` into the corresponding datasets, then ingest the generated crime batch.

The batch-with-100-valid-crimes-at-landmarks.csv batch can be sent to the dev mailbox and should produce crime matches that can be viewed in the UI.

## Deterministic data

The project uses a seeded Faker instance and prefers the British English locale to generate realistic looking (but fake) addresses, postcodes etc.
