interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data: Post[] = await response.json();
    return data;
}

const main = async () => {
    try {
        const posts = await fetchPosts();
        console.log(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

main();
