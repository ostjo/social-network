export default function imageModalReducer(imageModalVisible = false, action) {
    if (action.type == "img-modal/toggleVisibility") {
        imageModalVisible = !imageModalVisible;
    }

    return imageModalVisible;
}

export function toggleModalVisibility() {
    return {
        type: "img-modal/toggleVisibility",
    };
}
