export async function generateMetadata ({ params }) {
    const { id } = params;
    return {
        title: "Bài viết" + id,
    };
}

export default function DetailBlog ({params}) {
    return <h1>Chi tiết bài viết {params.id}</h1>;
}