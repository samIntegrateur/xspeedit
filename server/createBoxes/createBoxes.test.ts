import { createBoxes } from './createBoxes';

describe('createBoxes', () => {
    test('Should return 1 full box with 37', () => {
        const result = createBoxes('37');
        expect(result).toBe('37');
    });

    test('Should return 2 full boxes with 371234', () => {
        const result = createBoxes('371234');
        expect(result).toBe('37/1234');
    });

    test('Should return 2 full boxes and 2 uncompleted boxes with 37123498', () => {
        const result = createBoxes('37123498');
        expect(result).toBe('37/1234/9/8');
    });

    test('Should return empty string with invalid input string', () => {
        const result = createBoxes('ea01');
        expect(result).toBe('');
    });

    test('Should return 5 unordered boxes with 8944156531', () => {
        const result = createBoxes('8944156531');
        expect(result).toContain('811');
        expect(result).toContain('9');
        expect(result).toContain('44');
        expect(result).toContain('55');
        expect(result).toContain('63');
    });
});
