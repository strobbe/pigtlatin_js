"user strict";

function translateArea() {
    const originalTextArea = document.getElementById("original_text");
    const translateTextArea = document.getElementById("translated_text");

    translateTextArea.value = pigLatinBody(originalTextArea.value);
}

function pigLatinBody(body) {
    let paragraphs, outParagraphs;

    paragraphs = body.split('\n');
    outParagraphs = paragraphs.map( paragraphc => pigLatinSentence(paragraphc));
    return outParagraphs.join('\n');
}

function pigLatinSentence(sentence) {
    let words, outWords;

    words = sentence.split(' ');
    outWords = words.map( word => pigLatinWord(word));
    return outWords.join(' ');
}

function pigLatinWord(word) {
    const suffixVowel = "yay";
    const suffixConsonant = "ay";
    let punct, possessive, suffix, main, front, newWord;
    let capitalized = false
    
    // If the "word" is empty or begins with punctuation, just send it as is.
    if (word != "" && !isPunct(word[0])) {
        capitalized = word[0] == word[0].toUpperCase();

        word = word.toLowerCase();

        [word, punct] = getPunct(word);
        [word, possessive] = getPossessive(word);
        [main, front] = getPartsNewWord(word);

        newWord = main + front + (front === "" ? suffixVowel : suffixConsonant) + possessive + punct;
        newWord = capitalized ? newWord.charAt(0).toUpperCase() + newWord.slice(1) : newWord;
    } else {
        newWord = word;
    }
    return newWord;
}

function isPunct(char) {
    const puncts = ".;:!?,\/@#$%^&*()-=+_";
    return puncts.indexOf(char) > -1;
}

function getPunct(word) {
    const puncts = ".;:!?,\/@#$%^&*()-=+_";
    let outWord = word;

    let i = word.length -1;
    let punct = "";

    if (isPunct(word[word.length - 1])) {
        while (isPunct(word[i])) {
            punct += word[i];
            i--;
        }
           outWord = word.slice(0, word.length - punct.length);
    }
    return [outWord, punct];
}

function getPartsNewWord(word) {
    let part1, part2;
    let outParts = [];

    word = word.toLowerCase();

    switch (true) {
        case word.slice(0,2) == "qu":
            part1 = word.slice(2);
            part2 = "qu";
            outParts = [part1, part2]
            break;
        case word[0] == "y":
            part1 = word.slice(1);
            part2 = "y";
            outParts = [part1, part2]
            break;
        default:
            outParts = splitByVowel(word);
    }
    return outParts;
}

function splitByVowel(word) {
    let part1, part2;
    const wordArray = word.split('');

    idx = findFirstVowel(wordArray);

    part2 = wordArray.slice(0, idx).join('');
    part1 = wordArray.slice(idx).join('');

    return [part1, part2]
}

function getPossessive(word) {
    let possessive = "";

    if (word.slice(-2).toLowerCase() == "'s") {
        word = word.slice(0, -2);
        possessive = "'s"
    }
    return [word, possessive];
}

function findFirstVowel(word) {
    const vowels = "aeiouy";
    let letter;

    for (let i=0; i < word.length; i++) {
        letter = word[i].toLowerCase();

        if (vowels.indexOf(letter) > -1) {
            return i;
        }
    }
    return -1;
}