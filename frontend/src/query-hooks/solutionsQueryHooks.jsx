import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetSolutions = (choiceId) => {
	return useQuery(["choice", choiceId, "solution"], async () => {
		const { data } = await axios.get(`/choice/${choiceId}/solution`);
		return data;
	});
};

export const useGetSingleSolution = (choiceId, solutionId, setError) => {
	return useQuery(
		["choice", choiceId, "solution", solutionId],
		async () => {
			const { data } = await axios.get(
				`/choice/${choiceId}/solution/${solutionId}`
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

export const useCreateSolution = (choiceId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(solutionData) => {
			const result = axios.post(`/choice/${choiceId}/solution`, solutionData);
			console.log(result);
			return result;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["choice", choiceId, "solution"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
				console.log(response.data);
			},
		}
	);
};

export const useUpdateSolution = (choiceId, solutionId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(solutionData) => {
			return axios.patch(
				`/choice/${choiceId}/solution/${solutionId}`,
				solutionData
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["choice", choiceId, "solution"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};

export const useDeleteSolution = (choiceId, setError) => {
	const queryClient = useQueryClient();
	return useMutation(
		(solutionId) => {
			return axios.delete(`/choice/${choiceId}/solution/${solutionId}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["choice", choiceId, "solution"]);
			},
			onError: ({ response }) => {
				setError(response.data.msg);
			},
		}
	);
};
