export type APINotification = {
	text: string;
	type: "error" | "warning" | "success";
};

export type APIResponse<T> = {
	data?: T;
	notifications?: APINotification[];
};

class API
{
	public readonly host = 'http://localhost';
	public readonly port = '3000';

	public constructor()
	{
	}

	public async get<T>(aPath: string, aParams: Record<string, any>): Promise<APIResponse<T>>
	{
		const url = new URL(this._formPath(aPath));

		this._appendParams(url, aParams);

		return this._request<T>(url.toString(), "GET");
	}

	public async patch<T>(aPath: string, aParams: Record<string, any>, aData: any): Promise<APIResponse<T>>
	{
		const url = new URL(this._formPath(aPath));

		this._appendParams(url, aParams);

		return this._request<T>(url.toString(), "PATCH", aData);
	}

	private _formPath(aPath: string): string
	{
		return `${this.host}:${this.port}${aPath}`;
	}

	private _appendParams(aURL: URL, aParams: Record<string, any>): void
	{
		const keys = Object.keys(aParams);
		
		for (const key of keys)
		{
			aURL.searchParams.append(key, aParams[key]);
		}
	}

	private async _request<T>(
		aPath: string,
		aMethod: 'GET'|'POST'|'PATCH'|'DELETE',
		aData?: any
	): Promise<APIResponse<T>>
	{
		const init: RequestInit = {
			method: aMethod,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			mode: 'cors',
		};

		if (aData) {
			init.body = JSON.stringify(aData);
		}

		const response = await fetch(aPath, init);
		const result = await response.json();

		return result;
	}
};

export default API;
