export default function PostDetail({params}: {params: {postId: string}}) {
    // console.log(params);
    return (
        <h1>Post {params.postId[0]}</h1>
    );
}