import {YouTubeAnalysisResponseDTO} from './YouTubeAnalysisResponse.dto';

export const YouTubeAnalysisService = {
    async getYouTubeAnalysis(videoLink: string): Promise<YouTubeAnalysisResponseDTO> {
        const response = await fetch(`http://localhost:8080/api/analysis/videoAnalysis?videoLink=${encodeURIComponent(videoLink)}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
};