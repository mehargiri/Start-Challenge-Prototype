import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetChoices = (challengeId) => {
	return useQuery(["challenge", challengeId, "choice"], async () => {
		const { data } = await axios.get(`/challenge/${challengeId}/choice`);
		return data;
	});
};

export const useGetSingleChoice = (challengeId, choiceId, setError) => {
	return useQuery(
		["challenge", challengeId, "choice", choiceId],
		async () => {
			const { data } = await axios.get(
				`/challenge/${challengeId}/choice/${choiceId}`
			);
			return data;
		},
		{
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};

export const useCreateChoice = (challengeId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(choiceData) => {
			const result = axios.post(`/challenge/${challengeId}/choice`, choiceData);
			console.log(result);
			return result;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["challenge", challengeId, "choice"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
				console.log(response.data);
			},
		}
	);
};

export const useUpdateChoice = (challengeId, choiceId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(choiceData) => {
			return axios.patch(
				`/challenge/${challengeId}/choice/${choiceId}`,
				choiceData
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["challenge", challengeId, "choice"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};

export const useDeleteChoice = (challengeId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(choiceId) => {
			return axios.delete(`/challenge/${challengeId}/choice/${choiceId}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["challenge", challengeId, "choice"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};
