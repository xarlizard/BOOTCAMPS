
public class Task3 {

    public static void main(String[] args) {

        TvSeries breakingBad = new TvSeries("Breaking Bad", 45, 62);
        Movie inception = new Movie("Inception", 148, 8.8);

        System.out.println("Testing Video Streaming Service:\n");
        System.out.println(breakingBad.getInfo());
        System.out.println(inception.getInfo());
    }
}

abstract class Video {

    protected String title;
    protected int duration;

    public Video(String title, int duration) {
        this.title = title;
        this.duration = duration;
    }

    public abstract String getInfo();
}

class TvSeries extends Video {

    private final int episodes;

    public TvSeries(String title, int duration, int episodes) {
        super(title, duration);
        this.episodes = episodes;
    }

    @Override
    public String getInfo() {
        return String.format("TV Series - Title: %s, Duration per episode: %d minutes, Episodes: %d",
                title, duration, episodes);
    }
}

class Movie extends Video {

    private final double rating;

    public Movie(String title, int duration, double rating) {
        super(title, duration);
        this.rating = rating;
    }

    @Override
    public String getInfo() {
        return String.format("Movie - Title: %s, Duration: %d minutes, Rating: %.1f/10",
                title, duration, rating);
    }
}
