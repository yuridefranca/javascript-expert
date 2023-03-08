const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepEqual } = require('assert');

(async () => {
    {
        // should throw invalid length error message
        const filePath = '../mocks/invalid_empty-file.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await rejects(result, rejection)
    }
    {
        // should throw invalid length error message
        const filePath = '../mocks/invalid_four-lines-file.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await rejects(result, rejection)
    }
    {
        // should throw invalid properties error message
        const filePath = '../mocks/invalid_missing-headers.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)

        await rejects(result, rejection)
    }
    {
        // should return a valid json
        const filePath = '../mocks/valid_three-lines-file.csv'
        const result = await File.csvToJson(filePath)
        const expect = [
            {
                "birthYear": 2002,
                "id": 123,
                "name": "Yuri Serafim",
                "profession": "Javascript Developer",
            },
            {
                "birthYear": 1996,
                "id": 124,
                "name": "John Doe",
                "profession": "PHP Developer",
            },
            {
                "birthYear": 1988,
                "id": 125,
                "name": "Mary Jhonson",
                "profession": "Java Expert",
            }
        ]

        deepEqual(result, expect)
    }
})()