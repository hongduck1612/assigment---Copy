import Link from "next/link"

export default function Blog() {
    return (
        <div>
            <h1>Bài viết mới</h1>
            <ul>
                <li>
                    <Link href="/blog/1">Bài viết 1</Link>
                </li>
                <li>
                    <Link href="/blog/2">Bài viết 2</Link>
                </li>
                <li>
                    <Link href="/blog/3">Bài viết 3</Link>
                </li>
            </ul>
        </div>
    )
}