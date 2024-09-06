import { Injectable } from "@angular/core";
import { Channel } from "../models/channel.model";

@Injectable({
    providedIn: 'root'
})

export class ChannelService {
 
    constructor() { }

    getChannels(): Channel[] {
        return JSON.parse(localStorage.getItem('channels') || '[]');
    }

    getChannelNameById (channelId: number): string {
        const channels = this.getChannels();
        const targetChannel = channels.find(c => c.id === channelId)
        if (targetChannel){
            return targetChannel.name;
        } else {
            return '';
        }
    }

    findLowestChannelId(channels: Channel[]) :number {
        let lowestId = 1;

        while (channels.some(channel => channel.id === lowestId)) {
            lowestId++;
        }
        return lowestId;
    }

    deleteChannel(channelId: number): void {
        let channels = this.getChannels();
        channels = channels.filter(channel => channel.id !== channelId);
        this.saveChannels(channels);
    }

    saveChannels(channels: Channel[]): void {
        localStorage.setItem('channels', JSON.stringify(channels));
    }

}

