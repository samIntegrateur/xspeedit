
const BOX_FILLING_LIMIT = 10;

const splitNumberToDigitList = (number: number): number[] => {
    return [...number + ''].map(Number);
};

const getDigitListSum = (digitList: number[]): number => {
    return digitList.reduce((acc, cur) => acc + cur, 0);
};


// first linear version
export const createLinearBoxes = (articles: string): string => {

    const articlesNumber = Number(articles);

    const boxList: string[] = [];
    let currentBoxFilling: number[] = [];

    const articlesDigitList = splitNumberToDigitList(articlesNumber);

    articlesDigitList.forEach((articleDigit, index) => {

        const newFillingSum = getDigitListSum([...currentBoxFilling, articleDigit]);

        if (newFillingSum < BOX_FILLING_LIMIT) {
            currentBoxFilling.push(articleDigit);
        } else if (newFillingSum === BOX_FILLING_LIMIT) {
            currentBoxFilling.push(articleDigit);
            boxList.push(currentBoxFilling.join(''));
            currentBoxFilling = [];
        } else if (newFillingSum > BOX_FILLING_LIMIT) {
            boxList.push(currentBoxFilling.join(''));
            currentBoxFilling = [articleDigit];

            if (index === articlesDigitList.length - 1) {
                boxList.push(currentBoxFilling.join(''));
            }
        }
    });

    return boxList.join('/');
};


interface InProgressBox {
    articles: number[];
    sum: number;
}

const addBox = (article?: number): InProgressBox => {
    return {
        sum: article ? article : 0,
        articles: article ? [article] : [],
    };
}

const addArticleToBox = (box: InProgressBox, article: number): InProgressBox => {
    return {
        sum: box.sum + article,
        articles: [...box.articles, article],
    };
};

const removeInProgressBox = (inProgressBoxes: InProgressBox[], indexToRemove: number): InProgressBox[] => {
    return inProgressBoxes.filter((item, index) => index !== indexToRemove);
}

export const createBoxes = (articles: string): string => {
    const articlesNumber = Number(articles);

    let inProgressBoxes: InProgressBox[] = [{...addBox()}];
    const fullBoxes: string[] = [];

    const articlesDigitList = splitNumberToDigitList(articlesNumber);


    articlesDigitList.forEach((articleDigit, index) => {

        const boxesLength = inProgressBoxes.length;

        for(let i = 0; i < boxesLength; i++) {

            const currentBox = inProgressBoxes[i];

            const newFillingSum = getDigitListSum([currentBox.sum, articleDigit]);

            if (newFillingSum <= BOX_FILLING_LIMIT) {
                const updatedBox = addArticleToBox(currentBox, articleDigit);
                inProgressBoxes[i] = { ...updatedBox };

                if (updatedBox.sum === BOX_FILLING_LIMIT) {
                    inProgressBoxes = [ ...removeInProgressBox(inProgressBoxes, i) ];

                    if (inProgressBoxes.length === 0) {
                        inProgressBoxes.push(addBox());
                    }
                    fullBoxes.push(updatedBox.articles.join(''));
                }
                break;
            } else if (i === (boxesLength - 1)) {
                inProgressBoxes.push(addBox(articleDigit));
                break;
            }
        }

        // add remaining boxes
        if (index === articlesDigitList.length - 1) {
            inProgressBoxes.forEach(box => {
                if (box.sum > 0) {
                    fullBoxes.push(box.articles.join(''));
                }
            });
        }
    });

    return fullBoxes.join('/');
}
