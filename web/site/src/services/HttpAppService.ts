import { basePath, environment } from "@/environment/environment.prod";
import { HttpService, LocalStorageEncryptService } from "common-lib";
import type { TokenProvider } from "common-lib";
import axios from "axios";

class HttpAppService implements TokenProvider {
    private token: string | null = null;

    async getToken(): Promise<string | null> {
        return this.token;
    }

    async refreshToken(): Promise<string | null> {
        try {
            let token = LocalStorageEncryptService.getFromLocalStorage("token", true);
            const res = await axios.post(`${basePath}${environment.updateToken}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data && res.data.data && res.data.data.token) {
                this.token = res.data.data.token;
                
                LocalStorageEncryptService.setToLocalStorage("token", this.token, true)
                return this.token;
            }

            this.token = null;
            return null;
        } catch (err) {
            console.error("Error refreshing token", err);
            this.token = null;
            return null;
        }
    }
}

// Instancia principal con tokenProvider
export const httpService = new HttpService(
    basePath,
    new HttpAppService(),
    true
);
