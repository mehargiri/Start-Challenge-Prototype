import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetChallenges = () => {
	return useQuery(["challenge"], async () => {
		const { data } = await axios.get(`/challenge`);
		return data;
	});
};

export const useGetSingleChallenge = (id, setError) => {
	return useQuery(
		["challenge", id],
		async () => {
			const { data } = await axios.get(`/challenge/${id}`);
			return data;
		},
		{
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};

export const useCreateChallenge = (setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(challengeData) => {
			return axios.post("/challenge", challengeData);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["challenge"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};

export const useUpdateChallenge = (challengeId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(challengeData) => {
			return axios.patch(`/challenge/${challengeId}`, challengeData);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["challenge"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};

export const useDeleteChallenge = (setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(id) => {
			return axios.delete(`/challenge/${id}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["challenge"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};
