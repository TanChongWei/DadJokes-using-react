function styler(score) {
    const breakPoints = {
        "-10": ["em em-face_with_symbols_on_mouth", "SERIOUS FACE WITH SYMBOLS COVERING MOUTH", "red"],
        "-5": ["em em-angry", "ANGRY FACE", "orange"],
        "-1": ["em em-face_with_rolling_eyes", "FACE WITH ROLLING EYES", "yellow"],
        "0": ["em em-neutral_face", "NEUTRAL FACE", "grey"],
        "1": ["em em-grin", "GRINNING FACE WITH SMILING EYES", "#98FB98"],
        "5": ["em em-smile", "SMILING FACE WITH OPEN MOUTH AND SMILING EYES", "#00FA9A"],
        "10": ["em em-rolling_on_the_floor_laughing", "ROLLING ON THE FLOOR LAUGHING", "#7CFC00"]
    }
    let idx;

    if (score === 0) idx = 0
    if (Math.abs(score) >= 1) idx = 1
    if (Math.abs(score) >= 5) idx = 5
    if (Math.abs(score) >= 10) idx = 10

    return score > 0 ? breakPoints[idx] : breakPoints[-idx]
}

export { styler }