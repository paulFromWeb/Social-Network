export const AddLike = (liked, changeLiked, numberLike, changeNumberLikes) => {
    changeLiked(!liked)
    numberLike = + numberLike
    if (liked) {
        changeNumberLikes(numberLike -= 1)
    } else {
        changeNumberLikes(numberLike += 1)
    }
}