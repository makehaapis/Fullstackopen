const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if (blogs.length > 0) {
        var likes = blogs.reduce((accum, blog) => accum + blog.likes, 0)
        return likes

    } else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        var blogWithMostLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
        const blog = {
            title: blogWithMostLikes.title,
            author: blogWithMostLikes.author,
            likes: blogWithMostLikes.likes
        }
        return blog

    } else {
        blog = {
            title: "",
            author: "",
            likes: 0
        }
        return blog
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
        const blog = blogs.reduce((value, current) => {
            value[current.author] = value[current.author] ? value[current.author] + 1 : 1;
            return value;
        }, {});
      
        const result = Object.keys(blog).map((key) => ({
            author: key,
            blogs: blog[key]
        }));
      
        var blogWithMostLikes = result.reduce((max, blog) => max.count > blog.count ? max : blog)

        return blogWithMostLikes

    } else {
        blog = {
            author: "",
            blogs: 0
        }
        return blog
    }
}

const mostLikes = (blogs) => {
    if (blogs.length > 0) {
        const blog = blogs.reduce((value, current) => {
            value[current.author] = value[current.author] ? value[current.author] + current.likes : current.likes;
            return value;
        }, {});
        const result = Object.keys(blog).map((key) => ({
            author: key,
            likes: blog[key]
        }));
        var blogWithMostLikes = result.reduce((max, blog) => max.likes > blog.likes ? max : blog)
        
        return blogWithMostLikes
    } else {
        blog = {
            author: "",
            blogs: 0
        }
        return blog
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}
